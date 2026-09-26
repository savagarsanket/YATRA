/* =====================================================
   YATRA
   Travel Website JavaScript
===================================================== */


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("navMenu");
const menuBtn = document.getElementById("menuBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
    } else {
        icon.className = "fa-solid fa-bars";
    }

});


document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuBtn.querySelector("i").className =
            "fa-solid fa-bars";

    });

});


/* ================= DARK MODE ================= */

const darkBtn = document.getElementById("darkBtn");

const savedTheme = localStorage.getItem("yatraTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    darkBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "yatraTheme",
        dark ? "dark" : "light"
    );

    darkBtn.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});


/* ================= SEARCH ================= */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const destinationCards =
    document.querySelectorAll(".destination-card");


function searchDestination() {

    const value =
        searchInput.value.trim().toLowerCase();

    if (!value) {

        showToast(
            "Try searching for Goa, Kerala, Kashmir..."
        );

        return;

    }

    let found = false;

    destinationCards.forEach(card => {

        const title =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        if (title.includes(value)) {

            found = true;

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            card.style.outline =
                "4px solid #ff7a18";

            setTimeout(() => {

                card.style.outline = "none";

            }, 1800);

        }

    });


    if (!found) {

        showToast(
            "Destination not found. Try another place."
        );

    }

}


searchBtn.addEventListener(
    "click",
    searchDestination
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            searchDestination();
        }

    }
);


/* ================= TOAST ================= */

const toast = document.getElementById("toast");
const toastMessage =
    document.getElementById("toastMessage");

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* ================= BUDGET ================= */

const calculateBtn =
    document.getElementById("calculateBtn");


calculateBtn.addEventListener("click", () => {

    const days =
        Number(document.getElementById("days").value);

    const hotel =
        Number(document.getElementById("hotel").value);

    const food =
        Number(document.getElementById("food").value);

    const transport =
        Number(document.getElementById("transport").value);


    if (
        days <= 0 ||
        hotel < 0 ||
        food < 0 ||
        transport < 0
    ) {

        showToast(
            "Please enter valid trip details."
        );

        return;

    }


    const total =
        (days * hotel) +
        (days * food) +
        transport;


    document.getElementById("totalBudget")
        .textContent =
        "₹" + total.toLocaleString("en-IN");


    showToast(
        "Your estimated YATRA budget is ready!"
    );

});


/* ================= MAPS ================= */

document.querySelectorAll(".map-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const location =
                button.dataset.location;

            const url =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(location);

            window.open(url, "_blank");

        });

    });


/* ================= PACKAGE BOOKING ================= */

function bookPackage(packageName) {

    const message =
        `Hello YATRA! I am interested in the ${packageName} package. Please share more details.`;

    const phone = "919870000000";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

}


/* ================= WORLD ================= */

function showComingSoon() {

    showToast(
        "International destinations are coming soon! 🌍"
    );

}


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    if (!name) {

        showToast("Please enter your name.");

        return;

    }


    showToast(
        `Thank you ${name}! We'll get back to you soon.`
    );

    contactForm.reset();

});


/* ================= WHATSAPP ================= */

const whatsappBtn =
    document.getElementById("whatsappBtn");


whatsappBtn.addEventListener("click", () => {

    const name =
        document.getElementById("name").value.trim();


    const message = name
        ? `Hello YATRA! My name is ${name}. I would like help planning a trip.`
        : "Hello YATRA! I would like help planning a trip.";


    const phone = "919870000000";


    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

});


/* ================= GALLERY LIGHTBOX ================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


document.querySelectorAll(".gallery-item img")
    .forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;

            lightbox.classList.add("active");

        });

    });


closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".destination-card, .package-card, .review-card, .gallery-item, .budget-box, .contact-form"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   MULTILINGUAL SYSTEM
===================================================== */

const translations = {

    en: {

        navHome: "Home",
        navDestinations: "Destinations",
        navPackages: "Packages",
        navGallery: "Gallery",
        navContact: "Contact",

        bookNow: "Book Now",

        heroEyebrow: "FROM INDIA TO THE WORLD",

        heroTitle:
            'Your journey.<br><span>Our YATRA.</span>',

        heroText:
            "Discover beautiful destinations, unforgettable experiences, and journeys worth remembering.",

        searchPlaceholder:
            "Search Goa, Kerala, Kashmir...",

        search: "Search",

        destinationsStat: "Destinations",
        travelersStat: "Happy Travelers",
        ratingStat: "Rating",
        scroll: "Scroll to explore",

        discoverLabel: "DISCOVER INDIA",

        destinationTitle:
            'Places worth <span>exploring.</span>',

        destinationText:
            "From peaceful beaches to majestic mountains, discover the places that make India unforgettable.",

        goaText:
            "Golden beaches, sunsets and endless adventures.",

        kashmirText:
            "Lakes, valleys and breathtaking Himalayan scenery.",

        rajasthanText:
            "Royal forts, colorful streets and timeless culture.",

        keralaText:
            "Calm backwaters, lush greenery and slow living.",

        ladakhText:
            "High mountain passes, monasteries and wild landscapes.",

        explore: "Explore",

        worldTitle:
            'India first.<br><span>The world next.</span>',

        worldText:
            "Start your YATRA in India and discover experiences around the globe. Your journey doesn't have borders.",

        exploreWorld: "Explore the World",

        packagesLabel: "CURATED JOURNEYS",

        packageTitle:
            'Travel made <span>simple.</span>',

        packageText:
            "Carefully planned packages so you can focus on making memories.",

        goaPackage:
            "Beaches, sunsets, local food and unforgettable nights.",

        keralaPackage:
            "Backwaters, greenery, beaches and peaceful escapes.",

        kashmirPackage:
            "Lakes, mountains, valleys and unforgettable views.",

        bookPackage: "Book Package",

        popular: "MOST POPULAR",

        plannerLabel: "PLAN SMARTER",

        budgetTitle:
            'Know your budget.<br><span>Enjoy your YATRA.</span>',

        budgetText:
            "Estimate your trip expenses before you pack your bags.",

        daysLabel: "Number of Days",
        hotelLabel: "Hotel / Day",
        foodLabel: "Food / Day",
        transportLabel: "Transport",

        calculate: "Calculate Budget",
        estimatedBudget: "Estimated Budget",

        galleryLabel: "MOMENTS",

        galleryTitle:
            'See the <span>journey.</span>',

        reviewsLabel: "TRAVELER STORIES",

        reviewsTitle:
            'Loved by <span>travelers.</span>',

        review1:
            "“YATRA made our Kerala trip incredibly easy. Everything was beautifully planned.”",

        review2:
            "“The Kashmir experience was unforgettable. Great hotels and excellent support.”",

        review3:
            "“Simple booking, beautiful destinations and memories we will never forget.”",

        contactLabel: "LET'S TALK",

        contactTitle:
            'Ready for your<br><span>next YATRA?</span>',

        contactText:
            "Tell us where you want to go and we'll help you plan an unforgettable journey.",

        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",

        interestPlaceholder:
            "What are you interested in?",

        messagePlaceholder:
            "Tell us about your dream trip...",

        sendMessage: "Send Message",

        whatsapp: "Chat on WhatsApp",

        footerText:
            "Discover India. Experience the world. Make every journey count.",

        quickLinks: "Quick Links",

        followUs: "Follow Us",

        rights: "All Rights Reserved.",

        footerTagline:
            "Made for travelers, by travelers."

    },


    hi: {

        navHome: "होम",
        navDestinations: "स्थान",
        navPackages: "पैकेज",
        navGallery: "गैलरी",
        navContact: "संपर्क",

        bookNow: "अभी बुक करें",

        heroEyebrow: "भारत से दुनिया तक",

        heroTitle:
            'आपकी यात्रा।<br><span>हमारा YATRA.</span>',

        heroText:
            "खूबसूरत स्थानों, यादगार अनुभवों और शानदार यात्राओं की खोज करें।",

        searchPlaceholder:
            "गोवा, केरल, कश्मीर खोजें...",

        search: "खोजें",

        destinationsStat: "स्थान",
        travelersStat: "खुश यात्री",
        ratingStat: "रेटिंग",
        scroll: "नीचे देखें",

        discoverLabel: "भारत की खोज करें",

        destinationTitle:
            'घूमने लायक <span>स्थान।</span>',

        destinationText:
            "शांत समुद्र तटों से लेकर शानदार पहाड़ों तक, भारत की खूबसूरती खोजें।",

        goaText:
            "सुनहरे समुद्र तट, सूर्यास्त और रोमांच।",

        kashmirText:
            "झीलें, घाटियाँ और हिमालय के शानदार दृश्य।",

        rajasthanText:
            "शाही किले, रंगीन गलियाँ और समृद्ध संस्कृति।",

        keralaText:
            "शांत बैकवाटर, हरियाली और सुकून।",

        ladakhText:
            "ऊंचे पहाड़ी रास्ते, मठ और शानदार प्राकृतिक दृश्य।",

        explore: "खोजें",

        worldTitle:
            'पहले भारत।<br><span>फिर पूरी दुनिया।</span>',

        worldText:
            "भारत से अपनी YATRA शुरू करें और दुनिया भर के अनुभवों की खोज करें।",

        exploreWorld: "दुनिया देखें",

        packagesLabel: "विशेष यात्राएं",

        packageTitle:
            'यात्रा को बनाएं <span>आसान।</span>',

        packageText:
            "हमारे योजनाबद्ध पैकेज आपको सिर्फ यादें बनाने पर ध्यान देने देते हैं।",

        goaPackage:
            "समुद्र तट, सूर्यास्त, स्थानीय भोजन और शानदार रातें।",

        keralaPackage:
            "बैकवाटर, हरियाली, समुद्र तट और सुकून।",

        kashmirPackage:
            "झीलें, पहाड़, घाटियाँ और शानदार नज़ारे।",

        bookPackage: "पैकेज बुक करें",

        popular: "सबसे लोकप्रिय",

        plannerLabel: "स्मार्ट योजना",

        budgetTitle:
            'अपना बजट जानें।<br><span>अपनी YATRA का आनंद लें।</span>',

        budgetText:
            "सामान पैक करने से पहले अपनी यात्रा का अनुमानित खर्च जानें।",

        daysLabel: "दिनों की संख्या",
        hotelLabel: "होटल / दिन",
        foodLabel: "खाना / दिन",
        transportLabel: "यात्रा खर्च",

        calculate: "बजट निकालें",
        estimatedBudget: "अनुमानित बजट",

        galleryLabel: "यात्रा के पल",

        galleryTitle:
            '<span>यात्रा</span> देखें।',

        reviewsLabel: "यात्रियों की कहानियां",

        reviewsTitle:
            'यात्रियों को <span>पसंद आया।</span>',

        review1:
            "“YATRA ने हमारी केरल यात्रा को बहुत आसान बना दिया। सब कुछ शानदार तरीके से व्यवस्थित था।”",

        review2:
            "“कश्मीर का अनुभव अविस्मरणीय था। शानदार होटल और बेहतरीन सहायता।”",

        review3:
            "“आसान बुकिंग, खूबसूरत जगहें और ऐसी यादें जिन्हें हम कभी नहीं भूलेंगे।”",

        contactLabel: "बात करते हैं",

        contactTitle:
            'क्या आप अपनी<br><span>अगली YATRA के लिए तैयार हैं?</span>',

        contactText:
            "हमें बताएं कि आप कहाँ जाना चाहते हैं और हम आपकी यात्रा की योजना बनाने में मदद करेंगे।",

        namePlaceholder: "आपका नाम",
        emailPlaceholder: "आपका ईमेल",

        interestPlaceholder:
            "आप किसमें रुचि रखते हैं?",

        messagePlaceholder:
            "अपनी यात्रा के बारे में बताएं...",

        sendMessage: "संदेश भेजें",

        whatsapp: "WhatsApp पर बात करें",

        footerText:
            "भारत खोजें। दुनिया का अनुभव करें। हर यात्रा को यादगार बनाएं।",

        quickLinks: "त्वरित लिंक",

        followUs: "हमें फॉलो करें",

        rights: "सर्वाधिकार सुरक्षित।",

        footerTagline:
            "यात्रियों के लिए, यात्रियों द्वारा।"

    },


    kn: {

        navHome: "ಮುಖಪುಟ",
        navDestinations: "ಸ್ಥಳಗಳು",
        navPackages: "ಪ್ಯಾಕೇಜ್‌ಗಳು",
        navGallery: "ಗ್ಯಾಲರಿ",
        navContact: "ಸಂಪರ್ಕ",

        bookNow: "ಈಗ ಬುಕ್ ಮಾಡಿ",

        heroEyebrow: "ಭಾರತದಿಂದ ಜಗತ್ತಿನವರೆಗೆ",

        heroTitle:
            'ನಿಮ್ಮ ಪ್ರಯಾಣ.<br><span>ನಮ್ಮ YATRA.</span>',

        heroText:
            "ಸುಂದರ ಸ್ಥಳಗಳು, ಮರೆಯಲಾಗದ ಅನುಭವಗಳು ಮತ್ತು ವಿಶೇಷ ಪ್ರಯಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",

        searchPlaceholder:
            "ಗೋವಾ, ಕೇರಳ, ಕಾಶ್ಮೀರ ಹುಡುಕಿ...",

        search: "ಹುಡುಕಿ",

        destinationsStat: "ಸ್ಥಳಗಳು",
        travelersStat: "ಸಂತೋಷದ ಪ್ರಯಾಣಿಕರು",
        ratingStat: "ರೇಟಿಂಗ್",
        scroll: "ಅನ್ವೇಷಿಸಲು ಕೆಳಗೆ",

        discoverLabel: "ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ",

        destinationTitle:
            'ಅನ್ವೇಷಿಸಲು ಯೋಗ್ಯವಾದ <span>ಸ್ಥಳಗಳು.</span>',

        destinationText:
            "ಶಾಂತ ಕಡಲತೀರಗಳಿಂದ ಅದ್ಭುತ ಪರ್ವತಗಳವರೆಗೆ ಭಾರತದ ಸೌಂದರ್ಯವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",

        goaText:
            "ಚಿನ್ನದ ಕಡಲತೀರಗಳು, ಸೂರ್ಯಾಸ್ತಗಳು ಮತ್ತು ಸಾಹಸಗಳು.",

        kashmirText:
            "ಸರೋವರಗಳು, ಕಣಿವೆಗಳು ಮತ್ತು ಹಿಮಾಲಯದ ಅದ್ಭುತ ದೃಶ್ಯಗಳು.",

        rajasthanText:
            "ಅರಮನೆಗಳು, ಬಣ್ಣಬಣ್ಣದ ಬೀದಿಗಳು ಮತ್ತು ಶ್ರೀಮಂತ ಸಂಸ್ಕೃತಿ.",

        keralaText:
            "ಶಾಂತ ಬ್ಯಾಕ್‌ವಾಟರ್‌ಗಳು, ಹಸಿರು ಪ್ರಕೃತಿ ಮತ್ತು ನೆಮ್ಮದಿ.",

        ladakhText:
            "ಎತ್ತರದ ಪರ್ವತ ದಾರಿಗಳು, ಮಠಗಳು ಮತ್ತು ಅದ್ಭುತ ಪ್ರಕೃತಿ.",

        explore: "ಅನ್ವೇಷಿಸಿ",

        worldTitle:
            'ಮೊದಲು ಭಾರತ.<br><span>ನಂತರ ಜಗತ್ತು.</span>',

        worldText:
            "ಭಾರತದಿಂದ ನಿಮ್ಮ YATRA ಆರಂಭಿಸಿ ಮತ್ತು ಪ್ರಪಂಚದಾದ್ಯಂತದ ಅನುಭವಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",

        exploreWorld: "ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸಿ",

        packagesLabel: "ವಿಶೇಷ ಪ್ರಯಾಣಗಳು",

        packageTitle:
            'ಪ್ರಯಾಣವನ್ನು <span>ಸರಳಗೊಳಿಸಿ.</span>',

        packageText:
            "ನಾವು ಯೋಜಿಸಿರುವ ಪ್ಯಾಕೇಜ್‌ಗಳೊಂದಿಗೆ ನಿಮ್ಮ ನೆನಪುಗಳ ಮೇಲೆ ಗಮನ ಹರಿಸಿ.",

        goaPackage:
            "ಕಡಲತೀರಗಳು, ಸೂರ್ಯಾಸ್ತಗಳು, ಸ್ಥಳೀಯ ಆಹಾರ ಮತ್ತು ಅದ್ಭುತ ಅನುಭವಗಳು.",

        keralaPackage:
            "ಬ್ಯಾಕ್‌ವಾಟರ್‌ಗಳು, ಹಸಿರು ಪ್ರಕೃತಿ, ಕಡಲತೀರಗಳು ಮತ್ತು ನೆಮ್ಮದಿ.",

        kashmirPackage:
            "ಸರೋವರಗಳು, ಪರ್ವತಗಳು, ಕಣಿವೆಗಳು ಮತ್ತು ಸುಂದರ ದೃಶ್ಯಗಳು.",

        bookPackage: "ಪ್ಯಾಕೇಜ್ ಬುಕ್ ಮಾಡಿ",

        popular: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ",

        plannerLabel: "ಸ್ಮಾರ್ಟ್ ಯೋಜನೆ",

        budgetTitle:
            'ನಿಮ್ಮ ಬಜೆಟ್ ತಿಳಿಯಿರಿ.<br><span>ನಿಮ್ಮ YATRA ಆನಂದಿಸಿ.</span>',

        budgetText:
            "ಪ್ರಯಾಣಕ್ಕೆ ಹೊರಡುವ ಮೊದಲು ನಿಮ್ಮ ಅಂದಾಜು ವೆಚ್ಚವನ್ನು ಲೆಕ್ಕ ಹಾಕಿ.",

        daysLabel: "ದಿನಗಳ ಸಂಖ್ಯೆ",
        hotelLabel: "ಹೋಟೆಲ್ / ದಿನ",
        foodLabel: "ಆಹಾರ / ದಿನ",
        transportLabel: "ಪ್ರಯಾಣ ವೆಚ್ಚ",

        calculate: "ಬಜೆಟ್ ಲೆಕ್ಕ ಹಾಕಿ",
        estimatedBudget: "ಅಂದಾಜು ಬಜೆಟ್",

        galleryLabel: "ಕ್ಷಣಗಳು",

        galleryTitle:
            '<span>ಪ್ರಯಾಣ</span>ವನ್ನು ನೋಡಿ.',

        reviewsLabel: "ಪ್ರಯಾಣಿಕರ ಕಥೆಗಳು",

        reviewsTitle:
            'ಪ್ರಯಾಣಿಕರು <span>ಇಷ್ಟಪಟ್ಟಿದ್ದಾರೆ.</span>',

        review1:
            "“YATRA ನಮ್ಮ ಕೇರಳ ಪ್ರವಾಸವನ್ನು ತುಂಬಾ ಸುಲಭಗೊಳಿಸಿತು. ಎಲ್ಲವೂ ಉತ್ತಮವಾಗಿ ಯೋಜಿಸಲಾಗಿತ್ತು.”",

        review2:
            "“ಕಾಶ್ಮೀರದ ಅನುಭವ ಮರೆಯಲಾಗದು. ಉತ್ತಮ ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಸಹಾಯ ದೊರೆಯಿತು.”",

        review3:
            "“ಸರಳ ಬುಕ್ಕಿಂಗ್, ಸುಂದರ ಸ್ಥಳಗಳು ಮತ್ತು ಮರೆಯಲಾಗದ ನೆನಪುಗಳು.”",

        contactLabel: "ಮಾತನಾಡೋಣ",

        contactTitle:
            'ನಿಮ್ಮ ಮುಂದಿನ<br><span>YATRAಗೆ ಸಿದ್ಧರಿದ್ದೀರಾ?</span>',

        contactText:
            "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ತಿಳಿಸಿ. ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಯೋಜಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",

        namePlaceholder: "ನಿಮ್ಮ ಹೆಸರು",
        emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್",

        interestPlaceholder:
            "ನಿಮಗೆ ಯಾವುದರಲ್ಲಿ ಆಸಕ್ತಿ ಇದೆ?",

        messagePlaceholder:
            "ನಿಮ್ಮ ಕನಸಿನ ಪ್ರವಾಸದ ಬಗ್ಗೆ ತಿಳಿಸಿ...",

        sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",

        whatsapp: "WhatsApp ನಲ್ಲಿ ಮಾತನಾಡಿ",

        footerText:
            "ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ. ಜಗತ್ತನ್ನು ಅನುಭವಿಸಿ. ಪ್ರತಿಯೊಂದು ಪ್ರಯಾಣವನ್ನೂ ನೆನಪಾಗಿಸಿಕೊಳ್ಳಿ.",

        quickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",

        followUs: "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",

        rights: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

        footerTagline:
            "ಪ್ರಯಾಣಿಕರಿಗಾಗಿ, ಪ್ರಯಾಣಿಕರಿಂದ."

    },


    gu: {

        navHome: "હોમ",
        navDestinations: "સ્થળો",
        navPackages: "પેકેજ",
        navGallery: "ગેલેરી",
        navContact: "સંપર્ક",

        bookNow: "હમણાં બુક કરો",

        heroEyebrow: "ભારતથી વિશ્વ સુધી",

        heroTitle:
            'તમારી યાત્રા.<br><span>અમારું YATRA.</span>',

        heroText:
            "સુંદર સ્થળો, યાદગાર અનુભવો અને ખાસ યાત્રાઓ શોધો.",

        searchPlaceholder:
            "ગોવા, કેરળ, કાશ્મીર શોધો...",

        search: "શોધો",

        destinationsStat: "સ્થળો",
        travelersStat: "ખુશ પ્રવાસીઓ",
        ratingStat: "રેટિંગ",
        scroll: "શોધવા માટે નીચે જુઓ",

        discoverLabel: "ભારતની શોધ કરો",

        destinationTitle:
            'ફરવા લાયક <span>સ્થળો.</span>',

        destinationText:
            "શાંત દરિયાકિનારાથી લઈને ભવ્ય પહાડો સુધી ભારતની સુંદરતા શોધો.",

        goaText:
            "સોનેરી દરિયાકિનારા, સૂર્યાસ્ત અને સાહસ.",

        kashmirText:
            "તળાવો, ખીણો અને હિમાલયના અદ્ભુત દૃશ્યો.",

        rajasthanText:
            "શાહી કિલ્લાઓ, રંગીન રસ્તાઓ અને સમૃદ્ધ સંસ્કૃતિ.",

        keralaText:
            "શાંત બેકવોટર, લીલોતરી અને સુકૂન.",

        ladakhText:
            "ઊંચા પહાડી રસ્તાઓ, મઠો અને અદ્ભુત કુદરતી દૃશ્યો.",

        explore: "શોધો",

        worldTitle:
            'પહેલા ભારત.<br><span>પછી આખું વિશ્વ.</span>',

        worldText:
            "ભારતથી તમારી YATRA શરૂ કરો અને સમગ્ર વિશ્વના અનુભવો શોધો.",

        exploreWorld: "વિશ્વની શોધ કરો",

        packagesLabel: "વિશેષ યાત્રાઓ",

        packageTitle:
            'પ્રવાસને બનાવો <span>સરળ.</span>',

        packageText:
            "સારી રીતે આયોજન કરેલા પેકેજ સાથે ફક્ત યાદો બનાવવા પર ધ્યાન આપો.",

        goaPackage:
            "દરિયાકિનારા, સૂર્યાસ્ત, સ્થાનિક ભોજન અને યાદગાર રાતો.",

        keralaPackage:
            "બેકવોટર, હરિયાળી, દરિયાકિનારા અને શાંતિ.",

        kashmirPackage:
            "તળાવો, પહાડો, ખીણો અને અદ્ભુત દૃશ્યો.",

        bookPackage: "પેકેજ બુક કરો",

        popular: "સૌથી લોકપ્રિય",

        plannerLabel: "સ્માર્ટ આયોજન",

        budgetTitle:
            'તમારું બજેટ જાણો.<br><span>તમારી YATRA માણો.</span>',

        budgetText:
            "બેગ પેક કરતા પહેલા તમારી યાત્રાનો અંદાજિત ખર્ચ જાણો.",

        daysLabel: "દિવસોની સંખ્યા",
        hotelLabel: "હોટેલ / દિવસ",
        foodLabel: "ખોરાક / દિવસ",
        transportLabel: "ટ્રાન્સપોર્ટ",

        calculate: "બજેટ ગણો",
        estimatedBudget: "અંદાજિત બજેટ",

        galleryLabel: "યાત્રાની ક્ષણો",

        galleryTitle:
            '<span>યાત્રા</span> જુઓ.',

        reviewsLabel: "પ્રવાસીઓની વાતો",

        reviewsTitle:
            'પ્રવાસીઓને <span>પસંદ આવ્યું.</span>',

        review1:
            "“YATRAએ અમારી કેરળ યાત્રાને ખૂબ સરળ બનાવી. બધું સુંદર રીતે આયોજન કરવામાં આવ્યું હતું.”",

        review2:
            "“કાશ્મીરનો અનુભવ અદ્ભુત હતો. સારા હોટેલ અને ઉત્તમ સહાય મળી.”",

        review3:
            "“સરળ બુકિંગ, સુંદર સ્થળો અને ક્યારેય ન ભૂલાય તેવી યાદો.”",

        contactLabel: "ચાલો વાત કરીએ",

        contactTitle:
            'તમારી આગામી<br><span>YATRA માટે તૈયાર છો?</span>',

        contactText:
            "તમે ક્યાં જવા માંગો છો તે જણાવો અને અમે તમારી યાદગાર યાત્રાની યોજના બનાવવામાં મદદ કરીશું.",

        namePlaceholder: "તમારું નામ",
        emailPlaceholder: "તમારો ઈમેઈલ",

        interestPlaceholder:
            "તમને શેમાં રસ છે?",

        messagePlaceholder:
            "તમારી ડ્રીમ ટ્રિપ વિશે જણાવો...",

        sendMessage: "સંદેશ મોકલો",

        whatsapp: "WhatsApp પર વાત કરો",

        footerText:
            "ભારત શોધો. વિશ્વનો અનુભવ કરો. દરેક યાત્રાને યાદગાર બનાવો.",

        quickLinks: "ઝડપી લિંક્સ",

        followUs: "અમને ફોલો કરો",

        rights: "તમામ હકો અનામત.",

        footerTagline:
            "પ્રવાસીઓ માટે, પ્રવાસીઓ દ્વારા."

    }

};


/* ================= LANGUAGE ================= */

const languageSelect =
    document.getElementById("language");


function changeLanguage(lang) {

    const data = translations[lang];

    if (!data) return;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (data[key]) {

                element.innerHTML =
                    data[key];

            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            if (data[key]) {

                element.placeholder =
                    data[key];

            }

        });


    document.documentElement.lang = lang;

    localStorage.setItem(
        "yatraLanguage",
        lang
    );

}


const savedLanguage =
    localStorage.getItem("yatraLanguage") || "en";


languageSelect.value = savedLanguage;

changeLanguage(savedLanguage);


languageSelect.addEventListener(
    "change",
    event => {

        changeLanguage(event.target.value);

        showToast(
            "Language changed successfully."
        );

    }
);