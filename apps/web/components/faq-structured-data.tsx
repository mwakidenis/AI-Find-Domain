export function FAQStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the AI generate domain names?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tool uses advanced OpenAI GPT-4 models to understand your keywords and example domains, then generates creative and relevant domain name suggestions. The AI is trained to create brandable, memorable, and available domain names.",
        },
      },
      {
        "@type": "Question",
        name: "Is WHOIS checking real-time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all domain availability checks are performed in real-time using WHOIS lookups to ensure the most accurate results. You get instant feedback on whether a domain is available, taken, or for sale.",
        },
      },
      {
        "@type": "Question",
        name: "What TLDs are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support 25+ popular TLDs including .com, .io, .dev, .ai, .app, .net, .org, .co, .tech, .sh, .xyz, .me, .so, .gg, .fm, .to, .cc, .tv, .vc, .ws, .us, .biz, .info, .online, and .site.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use my own OpenAI API key?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can configure your own OpenAI API key using an environment variable or a configuration file when using the CLI tool or Node.js API.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a rate limit for the demo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the online demo is limited to 5 free generations per signed-in user. The CLI tool and API have no rate limits when using your own OpenAI API key.",
        },
      },
      {
        "@type": "Question",
        name: "Is the domain generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! The CLI tool is 100% free and open source. The online demo offers 5 free generations with sign-in. You can use the CLI tool unlimited times with your own OpenAI API key.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this for commercial projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! Find My Domain is MIT licensed, which means you can use it for personal or commercial projects without restrictions. The generated domain names are yours to use.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
