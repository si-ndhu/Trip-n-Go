import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './FAQs.css'; // Import your custom CSS file for styling

const FAQPage = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (categoryIndex, questionIndex) => {
    setExpanded((prevExpanded) => {
      const expandedState = { ...prevExpanded };
      expandedState[categoryIndex] = expandedState[categoryIndex] === questionIndex ? null : questionIndex;
      return expandedState;
    });
  };

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'What are your business hours?',
          answer: 'Our business hours are from 9:00 AM to 5:00 PM, Monday to Friday.',
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer refunds before 30 days of travel date. Please refer to our refund policy for more details.',
        },
        {
          question: 'How do I update my account information?',
          answer: 'To update your account information, log into your account and go to the "Account Settings" page. From there, you can edit your personal details, shipping address, and payment information.',
        },
        {
          question: 'How can I provide feedback on your products or services?',
          answer: 'We welcome your feedback! You can provide feedback by filling out the contact form on our website or by emailing us directly. We appreciate your input.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'How do I reset my password?',
          answer: 'To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions sent to your registered email.',
        },
        {
          question: 'What browsers do you support?',
          answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge.',
        },
        {
          question: 'How do I clear my browser cache?',
          answer: 'To clear your browser cache, go to the browser settings or preferences menu and look for the "Clear browsing data" option. Select the cache or temporary files option and click on Clear or Delete.',
        },
        {
          question: 'How do I troubleshoot login problems?',
          answer: 'If you are experiencing login problems, first double-check your username and password. If the issue persists, try resetting your password or contacting our support team for assistance.',
        },
      ],
    },
    {
      category: 'Promotions & Discounts',
      questions: [
        {
          question: 'Are there any ongoing promotions?',
          answer: 'Yes, we currently have a summer sale with discounts up to 40% off on selected packages.',
        },
        {
          question: 'How can I redeem a discount code?',
          answer: 'During the checkout process, you can enter your discount code in the designated field and click "Apply" to redeem it.',
        },
        {
          question: 'Are there any upcoming sales or promotions?',
          answer: 'We frequently run sales and promotions throughout the year. To stay updated, sign up for our newsletter or follow us on social media',
        },
        {
          question: 'Can I combine multiple discount codes?',
          answer: 'In general, our system allows the use of only one discount code per order. Multiple discount codes cannot be combined.',
        },
      ],
    },
  ];

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <Tabs>
        <TabList>
          {faqData.map((category, index) => (
            <Tab key={index}>{category.category}</Tab>
          ))}
        </TabList>
        {faqData.map((category, categoryIndex) => (
          <TabPanel key={categoryIndex}>
            {category.questions.map((item, questionIndex) => (
              <div key={questionIndex} className="faq-item">
                <div
                  className={`faq-question ${expanded[categoryIndex] === questionIndex ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(categoryIndex, questionIndex)}
                >
                  {item.question}
                </div>
                {expanded[categoryIndex] === questionIndex && <div className="faq-answer">{item.answer}</div>}
              </div>
            ))}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default FAQPage;

