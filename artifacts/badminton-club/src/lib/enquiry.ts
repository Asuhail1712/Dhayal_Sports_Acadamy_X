type EnquiryFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export function buildEnquiryPayload(fields: EnquiryFields) {
  const trimmed = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.trim()]),
  ) as EnquiryFields;
  return {
    ...trimmed,
    // Older deployed endpoints only deliver message, so keep the new fields there too.
    message: [
      `WhatsApp: ${trimmed.phone}`,
      `Interested in: ${trimmed.interest}`,
      "",
      trimmed.message,
    ].join("\n"),
  };
}
