export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Find My Domain",
    alternateName: "AI Domain Name Generator",
    url: "https://find-my-domain.vercel.app",
    description:
      "AI-powered domain name generator using OpenAI GPT-4 with real-time WHOIS availability checking across 25+ TLDs.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Dmitrii Selikhov",
      url: "https://www.linkedin.com/in/dimetrix",
    },
    publisher: {
      "@type": "Organization",
      name: "Find My Domain",
      url: "https://find-my-domain.vercel.app",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "AI-Powered Domain Generation using OpenAI GPT-4",
      "Real-time WHOIS Availability Checking",
      "25+ TLD Support",
      "Instant Domain Search",
      "No Credit Card Required",
      "Free 5 Generations",
      "CLI Tool Available",
      "TypeScript API",
    ],
    screenshot: "https://find-my-domain.vercel.app/og-image.png",
  };

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Find My Domain CLI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    downloadUrl: "https://www.npmjs.com/package/find-my-domain",
    softwareVersion: "1.4.1",
    fileSize: "22.66KB",
    installUrl: "https://www.npmjs.com/package/find-my-domain",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Find My Domain",
    url: "https://find-my-domain.vercel.app",
    logo: "https://find-my-domain.vercel.app/og-image.png",
    sameAs: [
      "https://github.com/idimetrix/find-my-domain",
      "https://www.npmjs.com/package/find-my-domain",
      "https://www.linkedin.com/in/dimetrix",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "selikhov.dmitrey@gmail.com",
      contactType: "Customer Support",
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://find-my-domain.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Demo",
        item: "https://find-my-domain.vercel.app/demo",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Documentation",
        item: "https://find-my-domain.vercel.app/docs",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplication),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
