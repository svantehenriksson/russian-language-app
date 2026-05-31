import React from "react";

export default function PrivacyEtc() {
  return (
    <div className="container">
      <section className="card info-card">
        <div className="card-header">
          <div className="card-title info-title">Privacy, Terms, Support</div>
        </div>
        <div className="card-body info-body">
          <section id="privacy">
            <h2>Privacy Policy</h2>
            <p>
              We believe in privacy-first learning. We only collect what we need to make the app work better
              for you.
            </p>
            <h3>What we collect</h3>
            <p>
              If you’re just browsing: we use a random ID in your browser to see which lessons are popular.
              It’s anonymous—we don’t know who you are.
            </p>
            <p>
              If you sign up: we save your email and learning progress so you can pick up where you left off
              on any device.
            </p>
            <h3>The Tech Stuff (Data Processors)</h3>
            <p>
              To keep the lights on, we use a few trusted partners: Supabase (for your account), Netlify
              (to host the site), and Cloudflare (for security). They help us process data, but they don’t
              “own” it.
            </p>
            <h3>Your Rights</h3>
            <p>
              It’s your data. You can ask us to see it, fix it, or delete it whenever you like. Just email{" "}
              <a href="mailto:puhuu@yahoo.com">puhuu@yahoo.com</a> and we’ll handle it. Since we’re in the EU,
              you also have the right to contact your local data protection authority if something feels off.
            </p>
          </section>

          <section id="terms">
            <h2>Terms of Service</h2>
            <p>The “fine print” made simple:</p>
            <p>
              As Is: we’re building this in the open! The app is provided “as is.” We try our best to keep
              it bug-free, but we can’t offer official warranties.
            </p>
            <p>
              Ownership: we put a lot of heart into the content, code, and design of puhuu.fi. Please don’t
              copy, scrape, or resell our work.
            </p>
            <p>
              Changes: we might update features or change things up as we grow. We’ll do our best to let you
              know if a big change is coming.
            </p>
            <p>
              Liability: to the extent allowed by law, we aren’t responsible for any hiccups or losses that
              happen while you’re using the service.
            </p>
          </section>

          <section id="support">
            <h2>Support</h2>
            <p>
              We love feedback, suggestions, and ideas! Shoot a mail at: <a href="mailto:puhuu@yahoo.com">puhuu@yahoo.com</a>
            </p>
            <p>
              <a className="primary-btn" href="mailto:puhuu@yahoo.com?subject=Fluenzo%20feedback">
                Email Support
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
