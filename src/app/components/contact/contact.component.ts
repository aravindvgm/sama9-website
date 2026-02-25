import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactForm: FormGroup;
  submitted     = false;
  submitSuccess = false;

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

    // How many raw digits were before the cursor in the old display value
    const digitsBeforeCursor = oldVal.slice(0, cursorPos).replace(/\D/g, '').length;

    // Strip non-digits, cap at 10
    const digits = oldVal.replace(/\D/g, '').slice(0, 10);

    // Format: space after 5th digit  →  "98765 43210"
    const formatted = digits.length > 5
      ? `${digits.slice(0, 5)} ${digits.slice(5)}`
      : digits;

    // Push formatted display back to DOM (we own this input, no formControlName)
    input.value = formatted;

    // Sync form control with raw digits only — no space stored
    this.contactForm.get('phone')!.setValue(digits, { emitEvent: true });
    this.contactForm.get('phone')!.markAsDirty();

    // Restore cursor: find index of Nth digit in the formatted string
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
    // setTimeout defers until after Angular change detection to avoid cursor reset
    setTimeout(() => input.setSelectionRange(newCursor, newCursor), 0);
  }

  handleSubmit(): void {
    this.submitted = true;
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;

    /* TODO: replace with real API call */
    console.log('[ContactForm] Submitted:', this.contactForm.value);

    this.submitSuccess = true;
    setTimeout(() => {
      this.submitSuccess = false;
      this.submitted     = false;
      this.contactForm.reset();
      // Phone DOM input resets naturally: form is destroyed/re-created by *ngIf="!submitSuccess"
    }, 4000);
  }
}
