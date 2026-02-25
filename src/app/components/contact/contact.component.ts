import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

// ── EmailJS auto-reply config ──────────────────────────────────────────────
// Setup: npm install @emailjs/browser
// 1. Create account → https://www.emailjs.com
// 2. Add Gmail service  →  copy Service ID  → replace EJS_SERVICE
// 3. Create template with variables {{to_name}} {{to_email}} → replace EJS_TEMPLATE
// 4. Account → API Keys → Public Key → replace EJS_KEY
// Template "To Email" field must be set to {{to_email}}
const EJS_SERVICE  = 'YOUR_SERVICE_ID';
const EJS_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EJS_KEY      = 'YOUR_PUBLIC_KEY';
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  // Scroll to success card the moment *ngIf renders it into the DOM
  @ViewChild('successCard') set successCardRef(el: ElementRef) {
    if (el) {
      setTimeout(() => el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }

  contactForm: FormGroup;
  submitted      = false;
  submitting     = false;
  submitSuccess  = false;
  submitError    = false;
  recaptchaError = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email:   ['', [Validators.required, Validators.email]],
      phone:   ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
    });
  }

  get f() { return this.contactForm.controls; }

  isInvalid(field: string): boolean {
    const c = this.f[field];
    return c.invalid && (c.dirty || c.touched || this.submitted);
  }

  getError(field: string): string {
    const e = this.f[field].errors;
    if (!e) return '';
    if (e['required'])  return 'This field is required.';
    if (e['email'])     return 'Enter a valid email address.';
    if (e['minlength']) return `Minimum ${e['minlength'].requiredLength} characters required.`;
    if (e['maxlength']) return `Maximum ${e['maxlength'].requiredLength} characters allowed.`;
    if (e['pattern'])   return field === 'phone' ? 'Enter valid 10 digit mobile number.' : 'Invalid value.';
    return 'Invalid value.';
  }

  get messageLength(): number {
    return (this.f['message'].value as string)?.length ?? 0;
  }

  formatPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cursorPos = input.selectionStart ?? 0;
    const oldVal = input.value;

    const digitsBeforeCursor = oldVal.slice(0, cursorPos).replace(/\D/g, '').length;
    const digits = oldVal.replace(/\D/g, '').slice(0, 10);
    const formatted = digits.length > 5
      ? `${digits.slice(0, 5)} ${digits.slice(5)}`
      : digits;

    input.value = formatted;
    this.contactForm.get('phone')!.setValue(digits, { emitEvent: true });
    this.contactForm.get('phone')!.markAsDirty();

    let newCursor = formatted.length;
    if (digitsBeforeCursor === 0) {
      newCursor = 0;
    } else {
      let count = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
          count++;
          if (count === digitsBeforeCursor) { newCursor = i + 1; break; }
        }
      }
    }
    setTimeout(() => input.setSelectionRange(newCursor, newCursor), 0);
  }

  resetForm(): void {
    this.submitSuccess = false;
    this.submitted     = false;
    this.submitError   = false;
    this.recaptchaError = false;
    this.contactForm.reset();
  }

  async handleSubmit(): Promise<void> {
    this.submitted = true;
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;

    // reCAPTCHA — Netlify injects g-recaptcha-response into the DOM
    const recaptchaToken =
      document.querySelector<HTMLInputElement>('[name="g-recaptcha-response"]')?.value ?? '';
    if (!recaptchaToken) {
      this.recaptchaError = true;
      return;
    }
    this.recaptchaError = false;

    this.submitting  = true;
    this.submitError = false;

    const { name, email, phone, message } = this.contactForm.value;

    const body = new URLSearchParams({
      'form-name':            'contact',
      'bot-field':            '',           // honeypot — always empty for real users
      'g-recaptcha-response': recaptchaToken,
      name,
      email,
      phone: `+91${phone}`,
      message,
    });

    try {
      const res = await fetch('/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    body.toString(),
      });

      if (res.ok) {
        // Auto-reply: fire-and-forget — never blocks success UX
        emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { to_name: name, to_email: email }, EJS_KEY)
          .catch(() => { /* auto-reply failure is non-critical */ });

        this.submitSuccess = true;
        this.submitted     = false;
        this.contactForm.reset();
      } else {
        this.submitError = true;
      }
    } catch {
      this.submitError = true;
    } finally {
      this.submitting = false;
    }
  }
}
