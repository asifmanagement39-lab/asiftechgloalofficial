// AsifTechGlobal - Dynamic Website Core Script
const API_BASE = '/api';




async function initPremiumHomepage() {
    const packageGrid = document.getElementById('package-grid');
    const testimonialGrid = document.getElementById('testimonial-grid');
    const faqGrid = document.getElementById('home-faq-grid');
    if (location.hostname.endsWith("github.io") || (!packageGrid && !testimonialGrid && !faqGrid)) return;
    try {
        const response = await fetch(`${API_BASE}/cms/home`);
        if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
        const { data } = await response.json();
        if (packageGrid) packageGrid.innerHTML = (data.packages || []).map(item => `
            <article class="premium-card ${item.featured ? 'featured' : ''}">
                ${item.featured ? '<span class="card-badge">Most requested</span>' : ''}
                <span class="eyebrow">${item.audience || 'Flexible engagement'}</span>
                <h3>${item.name}</h3><p>${item.description}</p>
                <strong class="price-label">${item.price_label || 'Custom quote'}</strong>
                <ul>${String(item.features || '').split('|').filter(Boolean).map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('')}</ul>
                <a class="btn btn-primary" href="contact.html">Discuss this model</a>
            </article>`).join('');
        if (testimonialGrid) testimonialGrid.innerHTML = (data.testimonials || []).map(item => `
            <article class="testimonial-card"><div class="stars">${'★'.repeat(Math.min(5, Math.max(1, Number(item.rating) || 5)))}</div>
            <blockquote>“${item.quote}”</blockquote><strong>${item.name}</strong><span>${item.role || ''}${item.company ? ` · ${item.company}` : ''}</span></article>`).join('');
        if (faqGrid) faqGrid.innerHTML = (data.faqs || []).map(item => `
            <details class="faq-item"><summary>${item.question}<i class="fas fa-plus"></i></summary><p>${item.answer}</p></details>`).join('');
    } catch (error) {
        console.error('Homepage CMS Error:', error);
        if (packageGrid) packageGrid.innerHTML = '<p class="content-state">Packages will be available shortly. <a href="contact.html">Start a conversation</a>.</p>';
        if (testimonialGrid) testimonialGrid.innerHTML = '<p class="content-state">Client stories are being refreshed. <a href="portfolio.html">Explore our work</a>.</p>';
        if (faqGrid) faqGrid.innerHTML = '<p class="content-state">Have a question? <a href="contact.html">Ask our team directly</a>.</p>';
    }
}




initPremiumHomepage();



