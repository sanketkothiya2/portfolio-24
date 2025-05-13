# EmailJS Setup Guide for Contact Form

Follow these steps to configure your contact form with EmailJS for receiving emails at sanketkothiya88@gmail.com:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add an Email Service

1. In your EmailJS dashboard, click on "Email Services" in the left sidebar
2. Click "Add New Service"
3. Choose "Gmail" as your service provider
4. Enter your Gmail credentials (sanketkothiya88@gmail.com and your password)
   - **Note**: It's recommended to use an App Password for security. [Learn how to create an App Password](https://support.google.com/accounts/answer/185833)
5. Give your service a name (e.g., "gmail")
6. Click "Create Service" and note down the Service ID (e.g., "service_xxxxxxx")

## Step 3: Create an Email Template

1. Go to "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Fill in the template details:
   - Template Name: "Contact Form"
   - Subject: "New Contact Form Submission from {{from_name}}"
   - Content:
     ```html
     <h2>You have a new message from your portfolio website:</h2>
     <p><strong>Name:</strong> {{from_name}}</p>
     <p><strong>Email:</strong> {{from_email}}</p>
     <p><strong>Phone:</strong> {{from_phone}}</p>
     <p><strong>Message:</strong> {{message}}</p>
     ```
4. Save the template and note down the Template ID (e.g., "template_xxxxxxx")

## Step 4: Update Your Code

1. In the `assets/js/futuristic.js` file, find the `initFormValidation` function
2. Replace the placeholder values with your actual credentials:
   - Replace `"YOUR_PUBLIC_KEY"` with your EmailJS Public Key (found in Account > API Keys)
   - Replace `"service_id"` with your actual Service ID (e.g., "service_xxxxxxx")
   - Replace `"template_id"` with your actual Template ID (e.g., "template_xxxxxxx")

```javascript
// Initialize EmailJS
emailjs.init("your_actual_public_key"); // Replace with your public key

// Later in the code...
emailjs.send('your_service_id', 'your_template_id', templateParams)
```

## Step 5: Test the Form

1. Open your website and navigate to the Contact section
2. Fill out the form and submit it
3. Check your email inbox (sanketkothiya88@gmail.com) to see if you received the submission

## Troubleshooting

- If emails aren't being delivered, check if your Gmail has security settings preventing access
- Verify your EmailJS credentials are correct
- Make sure your monthly email limit hasn't been exceeded (the free plan allows 200 emails per month)
- Check browser console for any JavaScript errors

## Additional Tips

- You can create a second template for auto-replies to the sender
- EmailJS offers analytics to track email deliveries and opens
- The free plan should be sufficient for most portfolio websites, but paid plans are available for higher volume
