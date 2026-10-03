import emailjs from "@emailjs/browser";

export const sendReminderEmail = async (
  name,
  email
) => {
  try {
    const result = await emailjs.send(
      "service_6tyj87d",      // Service ID
      "template_4u7utpm",     // Template ID
      {
        user_name: name,
        user_email: email,
        message:
          "Don't forget to complete your habits today!",
      },
      "pQSuobKWCnsxRRdD-"      // Public Key
    );

    console.log(result.text);
  } catch (error) {
    console.log(error);
  }
};