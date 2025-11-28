<template>
  <div class="container py-5">
    <h1 class="mb-4">About Us</h1>

    <!-- Mission and Values Section -->
    <section class="mb-5">
      <h2 class="mb-3 text-center">Our Mission & Values</h2>
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-center">Our Mission</h5>
              <p class="card-text">
                We are dedicated to improving the lives of refugees by raising awareness, advocating
                for policy changes, and providing essential support to help them rebuild their
                lives.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-center">Our Values</h5>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <strong>Integrity:</strong> We operate with honesty and transparency
                </li>
                <li class="mb-2">
                  <strong>Compassion:</strong> We act with empathy and care for those in need
                </li>
                <li class="mb-2">
                  <strong>Empowerment:</strong> We help refugees rebuild their lives with dignity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="mb-5">
      <h2 class="mb-3">Contact Us</h2>
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 mb-3 mb-md-0">
              <h5>Get in Touch</h5>
              <p><strong>Email:</strong> info@example.com</p>
              <p><strong>Phone:</strong> +61 2 1234 5678</p>
              <p><strong>Address:</strong> 42 Wallaby Way, Sydney, Australia</p>
            </div>
            <div class="col-md-6">
              <h5>Contact Hours</h5>
              <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
              <p><strong>Saturday - Sunday:</strong> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section>
      <h2 class="mb-3">Frequently Asked Questions</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq1"
              aria-expanded="true"
              aria-controls="faq1"
            >
              What do you do?
            </button>
          </h2>
          <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              We offer a wide range of services tailored to inform the community, offer support, and
              empower refugees, including educational programs, legal assistance, and community
              initiatives.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq2"
              aria-expanded="false"
              aria-controls="faq2"
            >
              How can I get started?
            </button>
          </h2>
          <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Getting started is easy! Simply create an account, explore our resources, and utilize
              our tools to participate in advocacy, awareness campaigns, volunteering, or access
              essential support for refugees.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq3"
              aria-expanded="false"
              aria-controls="faq3"
            >
              Do you offer support?
            </button>
          </h2>
          <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Yes, we provide comprehensive support to all our customers. Our support team is
              available during business hours to assist you.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  border: none;
}

.nav-link {
  cursor: pointer;
}
</style>
