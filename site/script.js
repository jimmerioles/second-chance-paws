/* Second Chance Paws — filters, puppy detail dialog, newsletter validation. */
(function () {
  "use strict";

  var PUPPIES = {
    mochi: {
      name: "Mochi",
      age: "4 months",
      sex: "Female",
      breed: "Shiba Inu mix",
      size: "Small · 12 lb",
      tags: ["Apartment-friendly", "Cuddly"],
      bio: "A 12-pound philosopher who believes every sunbeam is a personal invitation.",
      good: "Dogs, kids 8+",
      note: "Still learning leash manners",
      image: "../assets/puppies/mochi.jpg",
      alt: "Mochi, a red Shiba Inu puppy, lying on a white duvet beside a blue ball."
    },
    biscuit: {
      name: "Biscuit",
      age: "5 months",
      sex: "Male",
      breed: "Golden Retriever mix",
      size: "Medium · 28 lb",
      tags: ["High energy", "Good with kids"],
      bio: "A golden-hearted goofball with one ear that hasn't decided which way to point.",
      good: "Dogs, cats, kids",
      note: "Crate trained",
      image: "../assets/puppies/biscuit.jpg",
      alt: "Biscuit, a cream golden retriever puppy, resting on a fleece blanket."
    },
    pepper: {
      name: "Pepper",
      age: "3 months",
      sex: "Female",
      breed: "Border Collie mix",
      size: "Medium · 18 lb",
      tags: ["High energy", "Smart"],
      bio: "Herding socks, leaves, and the occasional leaf blower.",
      good: "Dogs, kids 10+",
      note: "Crate trained",
      image: "../assets/puppies/pepper.jpg",
      alt: "Pepper, a blue merle border collie puppy, carrying a bone across a lawn."
    },
    otis: {
      name: "Otis",
      age: "6 months",
      sex: "Male",
      breed: "Great Dane mix",
      size: "Large · 48 lb",
      tags: ["Low energy", "Cuddly"],
      bio: "A 48-pound lap dog in training. Proceed with a sturdy sofa.",
      good: "Dogs, kids 12+",
      note: "House-trained",
      image: "../assets/puppies/otis.jpg",
      alt: "Otis, a grey Great Dane puppy, standing on a tiled floor."
    },
    juniper: {
      name: "Juniper",
      age: "4 months",
      sex: "Female",
      breed: "Australian Shepherd mix",
      size: "Medium · 22 lb",
      tags: ["High energy", "Bonded pair"],
      bio: "Trail-ready and always the first to investigate a new smell.",
      good: "Dogs, kids 10+",
      note: "Bonded with Maple",
      image: "../assets/puppies/juniper.jpg",
      alt: "Juniper, a black, white, and tan Australian Shepherd puppy, standing on a wooden deck."
    },
    maple: {
      name: "Maple",
      age: "3 months",
      sex: "Female",
      breed: "Australian Shepherd mix",
      size: "Medium · 16 lb",
      tags: ["Bonded pair", "Apartment-friendly", "Cuddly"],
      bio: "A quieter soul who blossoms once Juniper shows her the way.",
      good: "Dogs",
      note: "Bonded with Juniper; shy at first",
      image: "../assets/puppies/maple.jpg",
      alt: "Maple, a blue merle Australian Shepherd puppy in a sweater, sitting on a beach."
    }
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------------------------------------------------------------
     Filters
     --------------------------------------------------------------------- */

  var grid = document.getElementById("puppy-grid");
  var cards = Array.prototype.slice.call(
    document.querySelectorAll("[data-puppy]")
  );
  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll("button[data-filter]")
  );
  var resultCount = document.getElementById("result-count");
  var emptyState = document.querySelector("[data-empty]");

  function applyFilter(filter) {
    var visible = 0;

    cards.forEach(function (card) {
      var tags = (card.getAttribute("data-tags") || "").split(" ");
      var matches = filter === "all" || tags.indexOf(filter) !== -1;
      card.hidden = !matches;
      if (matches) {
        visible += 1;
      }
    });

    filterButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-filter") === filter ? "true" : "false"
      );
    });

    if (resultCount) {
      resultCount.textContent =
        visible === 1 ? "Showing 1 puppy" : "Showing " + visible + " puppies";
    }

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }

    if (grid) {
      grid.hidden = visible === 0;
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.getAttribute("data-filter"));
    });
  });

  /* ---------------------------------------------------------------------
     Puppy detail dialog
     --------------------------------------------------------------------- */

  var layer = document.querySelector("[data-detail-layer]");
  var backdrop = document.querySelector("[data-backdrop]");
  var panel = document.querySelector('[role="dialog"][aria-modal="true"]');
  var closeButton = panel ? panel.querySelector("[data-close]") : null;
  var page = document.getElementById("page");
  var lastFocused = null;
  var closeTimer = null;
  var isClosing = false;

  var detailImage = panel ? panel.querySelector("[data-detail-image]") : null;
  var detailName = panel ? panel.querySelector("[data-detail-name]") : null;
  var detailMeta = panel ? panel.querySelector("[data-detail-meta]") : null;
  var detailBio = panel ? panel.querySelector("[data-detail-bio]") : null;
  var detailSize = panel ? panel.querySelector("[data-detail-size]") : null;
  var detailGood = panel ? panel.querySelector("[data-detail-good]") : null;
  var detailNote = panel ? panel.querySelector("[data-detail-note]") : null;
  var detailTags = panel ? panel.querySelector("[data-detail-tags]") : null;
  var detailCta = panel ? panel.querySelector("[data-detail-cta]") : null;

  function populateDetail(puppy) {
    if (!puppy) {
      return;
    }

    if (detailImage) {
      detailImage.src = puppy.image;
      detailImage.alt = puppy.alt;
    }
    if (detailName) {
      detailName.textContent = puppy.name;
    }
    if (detailMeta) {
      detailMeta.textContent =
        puppy.age + " · " + puppy.sex + " · " + puppy.breed;
    }
    if (detailBio) {
      detailBio.textContent = puppy.bio;
    }
    if (detailSize) {
      detailSize.textContent = puppy.size;
    }
    if (detailGood) {
      detailGood.textContent = puppy.good;
    }
    if (detailNote) {
      detailNote.textContent = puppy.note;
    }
    if (detailTags) {
      detailTags.textContent = "";
      puppy.tags.forEach(function (tag) {
        var item = document.createElement("li");
        item.className = "tag";
        item.textContent = tag;
        detailTags.appendChild(item);
      });
    }
    if (detailCta) {
      detailCta.href =
        "mailto:hello@secondchancepaws.org?subject=" +
        encodeURIComponent("Adoption application — " + puppy.name);
    }
  }

  function openDetail(card) {
    var puppy = PUPPIES[card.getAttribute("data-puppy")];
    if (!layer || !panel || !puppy) {
      return;
    }

    clearTimeout(closeTimer);
    isClosing = false;
    lastFocused = card;
    populateDetail(puppy);

    layer.hidden = false;
    document.documentElement.classList.add("modal-open");
    if (page) {
      page.inert = true;
    }

    window.requestAnimationFrame(function () {
      layer.classList.add("is-open");
      if (closeButton) {
        closeButton.focus();
      }
    });
  }

  function finishClose() {
    if (!layer) {
      return;
    }

    layer.hidden = true;
    layer.classList.remove("is-open");
    document.documentElement.classList.remove("modal-open");
    if (page) {
      page.inert = false;
    }

    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
    isClosing = false;
  }

  function closeDetail() {
    if (!layer || layer.hidden || isClosing) {
      return;
    }

    isClosing = true;
    layer.classList.remove("is-open");

    if (reduceMotion.matches) {
      finishClose();
      return;
    }

    closeTimer = window.setTimeout(finishClose, 310);
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openDetail(card);
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeDetail);
  }

  if (layer && backdrop) {
    layer.addEventListener("click", function (event) {
      if (event.target === layer || event.target === backdrop) {
        closeDetail();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!layer || layer.hidden) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDetail();
      return;
    }

    if (event.key !== "Tab" || !panel) {
      return;
    }

    var focusable = Array.prototype.slice.call(
      panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (!panel.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ---------------------------------------------------------------------
     Newsletter
     --------------------------------------------------------------------- */

  var newsletter = document.querySelector("form[data-newsletter]");
  var emailInput = newsletter
    ? newsletter.querySelector('input[type="email"]')
    : null;
  var emailError = document.querySelector("[data-newsletter-error]");
  var newsletterSuccess = document.querySelector(
    "[data-newsletter-success]"
  );
  var emailPattern = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

  function setEmailError(message) {
    if (!emailInput || !emailError) {
      return;
    }

    emailError.textContent = message;
    emailError.hidden = message === "";

    if (message) {
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.setAttribute("aria-describedby", "newsletter-error");
    } else {
      emailInput.setAttribute("aria-invalid", "false");
      emailInput.removeAttribute("aria-describedby");
    }
  }

  function validateEmail(showEmptyError) {
    if (!emailInput) {
      return false;
    }

    var value = emailInput.value.trim();

    if (value === "") {
      if (showEmptyError) {
        setEmailError("Enter your email address.");
      } else {
        setEmailError("");
      }
      return false;
    }

    if (!emailPattern.test(value)) {
      setEmailError("Enter a valid email address, like name@example.com.");
      return false;
    }

    setEmailError("");
    return true;
  }

  if (newsletter && emailInput) {
    emailInput.addEventListener("blur", function () {
      validateEmail(false);
    });

    emailInput.addEventListener("input", function () {
      if (emailInput.getAttribute("aria-invalid") === "true") {
        validateEmail(false);
      }
    });

    newsletter.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateEmail(true)) {
        emailInput.focus();
        return;
      }

      newsletter.reset();
      newsletter.hidden = true;

      if (newsletterSuccess) {
        newsletterSuccess.hidden = false;
        newsletterSuccess.focus();
      }
    });
  }
})();
