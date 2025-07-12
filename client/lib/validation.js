// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^(\+?63|0)?[0-9]{10}$/;

// Name validation regex (only letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email.trim());
};

export const validatePhone = (phone) => {
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  return PHONE_REGEX.test(cleanPhone);
};

export const validateName = (name) => {
  const trimmed = name.trim();
  return (
    trimmed.length >= 2 && trimmed.length <= 50 && NAME_REGEX.test(trimmed)
  );
};

export const validateRequired = (value) => {
  return value.trim().length > 0;
};

export const validateMinLength = (
  value,
  minLength,
) => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (
  value,
  maxLength,
) => {
  return value.trim().length <= maxLength;
};

// Home page contact form validation
export const validateHomeContactForm = (formData) => {
  const errors = [];

  // Name validation
  if (!validateRequired(formData.name)) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (!validateName(formData.name)) {
    errors.push({
      field: "name",
      message:
        "Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
    });
  }

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(formData.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Message validation
  if (!validateRequired(formData.message)) {
    errors.push({ field: "message", message: "Message is required" });
  } else if (!validateMinLength(formData.message, 10)) {
    errors.push({
      field: "message",
      message: "Message must be at least 10 characters long",
    });
  } else if (!validateMaxLength(formData.message, 1000)) {
    errors.push({
      field: "message",
      message: "Message must not exceed 1000 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Contact page order form validation
export const validateOrderForm = (formData) => {
  const errors = [];

  // Full name validation
  if (!validateRequired(formData.fullName)) {
    errors.push({ field: "fullName", message: "Full name is required" });
  } else if (!validateName(formData.fullName)) {
    errors.push({
      field: "fullName",
      message:
        "Full name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
    });
  }

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(formData.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Phone number validation
  if (!validateRequired(formData.phoneNumber)) {
    errors.push({ field: "phoneNumber", message: "Phone number is required" });
  } else if (!validatePhone(formData.phoneNumber)) {
    errors.push({
      field: "phoneNumber",
      message:
        "Please enter a valid Philippine phone number (e.g., +63 912 345 6789 or 09123456789)",
    });
  }

  // Address validation
  if (!validateRequired(formData.address)) {
    errors.push({ field: "address", message: "Address is required" });
  } else if (!validateMinLength(formData.address, 10)) {
    errors.push({
      field: "address",
      message: "Please provide a complete address (at least 10 characters)",
    });
  } else if (!validateMaxLength(formData.address, 200)) {
    errors.push({
      field: "address",
      message: "Address must not exceed 200 characters",
    });
  }

  // Service/Unit validation
  if (!validateRequired(formData.serviceUnit)) {
    errors.push({
      field: "serviceUnit",
      message: "Please select a service or specify the unit",
    });
  }

  // Concern details validation (optional but if provided, must meet requirements)
  if (formData.concernDetails.trim().length > 0) {
    if (!validateMinLength(formData.concernDetails, 10)) {
      errors.push({
        field: "concernDetails",
        message: "If providing details, please write at least 10 characters",
      });
    } else if (!validateMaxLength(formData.concernDetails, 1000)) {
      errors.push({
        field: "concernDetails",
        message: "Concern details must not exceed 1000 characters",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Get error message for a specific field
export const getFieldError = (
  errors,
  fieldName,
) => {
  const error = errors.find((error) => error.field === fieldName);
  return error ? error.message : null;
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // If it starts with +63, format as +63 XXX XXX XXXX
  if (cleaned.startsWith("+63")) {
    const number = cleaned.slice(3);
    if (number.length === 10) {
      return `+63 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
  }

  // If it starts with 63, format as +63 XXX XXX XXXX
  if (cleaned.startsWith("63") && cleaned.length === 12) {
    const number = cleaned.slice(2);
    return `+63 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  }

  // If it starts with 0, format as +63 XXX XXX XXXX
  if (cleaned.startsWith("0") && cleaned.length === 11) {
    const number = cleaned.slice(1);
    return `+63 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  }

  // If it's 10 digits, assume it's a mobile number without country code
  if (cleaned.length === 10) {
    return `+63 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  return phone; // Return original if can't format
};
