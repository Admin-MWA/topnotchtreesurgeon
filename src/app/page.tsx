"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const specialisedServices: {
  title: string;
  subtitle: string;
  image: string;
}[] = [
  {
    title: "Tree Removal",
    subtitle: "Tree Felling",
    image: "/assets/img/service-tree-removal.png",
  },
  {
    title: "Tree Pruning",
    subtitle: "Powerline Pruning",
    image: "/assets/img/service-tree-pruning.png",
  },
  {
    title: "Arborist Report",
    subtitle: "Arborial Assessments",
    image: "/assets/img/service-arborist-report.png",
  },
  {
    title: "Storm Damage",
    subtitle: "Insurance Make-safe",
    image: "/assets/img/service-storm-damage.png",
  },
  {
    title: "Woodchip Mulch",
    subtitle: "Mulching & Removal",
    image: "/assets/img/service-woodchip-mulch.png",
  },
  {
    title: "Land Clearing",
    subtitle: "Cleanups & Firebreaks",
    image: "/assets/img/service-land-clearing.png",
  },
];

const benefitPoints = [
  "Fully insured and qualified arborists.",
  "Specialists in large tree removals and multi tree pruning.",
  "Safe, clean and efficient work from start to finish",
  "Full clean up included",
  "High quality equipment and professional team",
];

const reviewQuoteIconSrc = "/assets/img/icon-quote.png";
const reviewStarsIconSrc = "/assets/img/icon-five-stars.png";

const reviewItems: { quote: string; author: string }[] = [
  {
    quote:
      "Top Notch street surgeons came in to remove a massive She-Oak in our back yard. Lindsay was prompt at sending us a quote and booking his guys in to do it. They got the job done quickly and were very price competitive. Great job guys",
    author: "Shannon Townley",
  },
  {
    quote:
      "Outstanding company who are so easy to deal with. Having never had to have any work like this done before I wasn't sure what to expect, but these boys didn't mess around and I can't recommend them highly enough. Will be using them again for sure.",
    author: "Stephen Connolly",
  },
  {
    quote:
      "Meet with the owner Lindsey to organise a quote, super helpful and knowledgeable and easy to work with and affordable. I would highly recommend using these guys for tree removal services and jobs.",
    author: "Kyle Armstrong",
  },
];

export default function Home() {
  const [status, setStatus] = useState<string>("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      phone: String(formData.get("phone") || ""),
      description: String(formData.get("description") || ""),
      website: String(formData.get("website") || ""),
    };

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { ok?: boolean; error?: string };

    if (!response.ok || !data.ok) {
      setStatus(data.error || "Could not submit quote request.");
      setSending(false);
      return;
    }

    window.gtag?.("event", "qualify_lead", {
      currency: "AUD",
      value: 1,
    });

    form.reset();
    setStatus("Thanks. We have received your quote request.");
    setSending(false);
  }

  return (
    <main className="site">
      <header className="site-header">
        <div className="site-header-brand">
          <div className="site-header-logo">
            <Image
              src="/assets/img/logo-primary.png"
              alt="Top Notch Tree Surgeons"
              width={96}
              height={96}
              priority
            />
          </div>
          <div className="site-header-names">
            <p className="site-header-company">TOP NOTCH TREE SURGEONS</p>
            <p className="site-header-tagline">BOORN WIRIN</p>
          </div>
        </div>
        <div className="site-header-cta">
          <p className="site-header-cta-title">GET A FREE QUOTE</p>
          <div className="site-header-phone-row">
            <a href="tel:0460967845" className="site-header-phone">
              0460 967 845
            </a>
            <Image
              className="site-header-phone-icon"
              src="/assets/img/icon-phone.png"
              alt=""
              width={36}
              height={36}
            />
          </div>
        </div>
      </header>
      <div className="hero-benefits-wrap">
        <section className="hero-quote" aria-labelledby="quote-heading">
          <div
            className="hero-quote-visual"
            role="img"
            aria-label="Arborist working in a tree"
          />
          <div className="hero-quote-panel">
            <section id="request" className="form-section">
              <a className="request-anchor" href="#request">
                REQUEST
              </a>
              <h2 id="quote-heading" className="form-title">
                Free Priority Quote for Tree Removal and Large Tree Work
              </h2>
              <p className="form-subcopy">
                Tell us about your job and get a fast, obligation free quote.
              </p>
              <form onSubmit={onSubmit}>
                <input name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input name="address" placeholder="Address" required />
                <input name="phone" placeholder="Phone" required />
                <label htmlFor="description">Description of works required: *</label>
                <textarea id="description" name="description" required />
                <input
                  className="hp-field"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden
                />
                <button disabled={sending} type="submit">
                  {sending ? "Submitting..." : "Get My Quote"}
                </button>
              </form>
              <p className="form-note">
                No obligation. Just a free quote from a qualified arborist.
              </p>
              {status && <p className="form-status">{status}</p>}
            </section>
          </div>
        </section>

        <section className="benefits" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="benefits-title">
            Stress Free and Professional Tree Removal in Perth
          </h2>
          <div className="benefits-rule" aria-hidden />
          <ul className="benefits-list">
            {benefitPoints.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <p className="benefits-closing">
            We specialise in medium and large tree projects across Perth.
          </p>
        </section>
      </div>

      <section className="services" aria-labelledby="services-heading">
        <h2 id="services-heading" className="services-lead">
          Key Specialised Services
        </h2>
        <div className="services-grid">
          {specialisedServices.map((item) => (
            <article key={item.title} className="services-card">
              <div className="services-card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 42vw, 180px"
                  className="services-card-img"
                />
              </div>
              <h3 className="services-card-title">{item.title}</h3>
              <p className="services-card-subtitle">{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="community-banner" aria-labelledby="community-banner-heading">
        <div className="community-banner-bg" aria-hidden />
        <div className="community-banner-inner">
          <div className="community-banner-rule" aria-hidden />
          <h2 id="community-banner-heading" className="community-banner-title">
            TOP NOTCH TREE SURGEONS
          </h2>
          <p className="community-banner-copy">
            <span className="community-banner-copy-line">
              A 100 percent Aboriginal owned and operated business proudly verified by Supply Nation.
            </span>{" "}
            <span className="community-banner-copy-line">
              Trusted across Perth for our professionalism, community values and exceptional workmanship.
            </span>
          </p>
          <div className="community-banner-logos">
            <Image
              className="community-banner-logo community-banner-logo--tn"
              src="/assets/img/logo-community-top-notch.png"
              alt="Top Notch Tree Surgeons"
              width={200}
              height={200}
            />
            <Image
              className="community-banner-logo"
              src="/assets/img/logo-community-arbwest.png"
              alt="ARBWEST"
              width={280}
              height={120}
            />
            <Image
              className="community-banner-logo"
              src="/assets/img/logo-community-supply-nation.webp"
              alt="Supply Nation"
              width={240}
              height={120}
            />
          </div>
        </div>
      </section>

      <div className="reviews-suite">
        <div className="quote-cta-strip">
          <p className="quote-cta-strip-text">GET YOUR FREE QUOTE!</p>
          <a className="quote-cta-strip-btn" href="#request">
            REQUEST
          </a>
        </div>

        <section className="reviews-block" aria-labelledby="reviews-heading">
          <div className="reviews-block-bg" aria-hidden />
          <div className="reviews-block-inner">
            <div className="reviews-block-rule" aria-hidden />
            <h2 id="reviews-heading" className="reviews-block-title">
              See What Your Valued Community is Saying About Our Services
            </h2>
            <div className="review-cards">
              {reviewItems.map((item) => (
                <article key={item.author} className="review-card">
                  <div
                    className="review-card-icons-row"
                    role="img"
                    aria-label="Quote and five star rating"
                  >
                    <Image
                      className="review-card-quote-img"
                      src={reviewQuoteIconSrc}
                      alt=""
                      width={35}
                      height={24}
                    />
                    <Image
                      className="review-card-stars-img"
                      src={reviewStarsIconSrc}
                      alt=""
                      width={226}
                      height={56}
                    />
                  </div>
                  <p className="review-card-quote">{item.quote}</p>
                  <h3 className="review-card-author">{item.author}</h3>
                </article>
              ))}
            </div>
            <p className="reviews-block-footline">
              Perth&apos;s Leading Arborists in Tree Removal, Lopping &amp; Pruning
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
