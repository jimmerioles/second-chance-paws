(function () {
  "use strict";

  var puppies = {
    mochi: {
      name: "Mochi",
      age: "4 months",
      sex: "Female",
      breed: "Shiba Inu mix",
      size: "Small · 12 lb",
      tags: ["Apartment-friendly", "Cuddly"],
      bio: "A 12-pound philosopher who believes every sunbeam is a personal invitation.",
      goodWith: "Dogs, kids 8+",
      note: "Still learning leash manners",
      alt: "Mochi, a tan Shiba Inu mix puppy, lying on a white bed next to a blue ball."
    },
    biscuit: {
      name: "Biscuit",
      age: "5 months",
      sex: "Male",
      breed: "Golden Retriever mix",
      size: "Medium · 28 lb",
      tags: ["High energy", "Good with kids"],
      bio: "A golden-hearted goofball with one ear that hasn't decided which way to point.",
      goodWith: "Dogs, cats, kids",
      note: "Crate trained",
      alt: "Biscuit, a cream-colored retriever mix puppy, resting on a fuzzy blanket."
    },
    pepper: {
      name: "Pepper",
      age: "3 months",
      sex: "Female",
      breed: "Border Collie mix",
      size: "Medium · 18 lb",
      tags: ["High energy", "Smart"],
      bio: "Herding socks, leaves, and the occasional leaf blower.",
      goodWith: "Dogs, kids 10+",
      note: "Crate trained",
      alt: "Pepper, a gray and white border collie mix puppy, carrying a bone across grass."
    },
    otis: {
      name: "Otis",
      age: "6 months",
      sex: "Male",
      breed: "Great Dane mix",
      size: "Large · 48 lb",
      tags: ["Low energy", "Cuddly"],
      bio: "A 48-pound lap dog in training. Proceed with a sturdy sofa.",
      goodWith: "Dogs, kids 12+",
      note: "House-trained",
      alt: "Otis, a gray Great Dane mix puppy wearing a red collar, standing indoors."
    },
    juniper: {
      name: "Juniper",
      age: "4 months",
      sex: "Female",
      breed: "Australian Shepherd mix",
      size: "Medium · 22 lb",
      tags: ["High energy", "Bonded pair"],
      bio: "Trail-ready and always the first to investigate a new smell.",
      goodWith: "Dogs, kids 10+",
      note: "Bonded with Maple",
      alt: "Juniper, a black, white, and tan Australian Shepherd mix puppy, standing on a wooden deck."
    },
    maple: {
      name: "Maple",
      age: "3 months",
      sex: "Female",
      breed: "Australian Shepherd mix",
      size: "Medium · 16 lb",
      tags: ["Bonded pair", "Apartment-friendly", "Cuddly"],
      bio: "A quieter soul who blossoms once Juniper shows her the way.",
      goodWith: "Dogs",
      note: "Bonded with Juniper; shy at first",
      alt: "Maple, a gray and tan Australian Shepherd mix puppy in a striped sweater on a beach."
    }
  };

  var filterMembers = {
    apartment: ["mochi", "maple"],
    "high-energy": ["biscuit", "pepper", "juniper"],
    cuddly: ["mochi", "otis", "maple"],
    bonded: ["juniper", "maple"]
  };

  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-puppy]"));
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("button[data-filter]"));
  var resultCount = document.querySelector("[data-result-count]");
  var emptyState = document.querySelector("[data-empty]");

  function setFilter(filter) {
    filterButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });

    var visible = 0;
    cards.forEach(function (card) {
      var slug = card.dataset.puppy;
      var show = card.isConnected && (filter === "all" || filterMembers[filter].indexOf(slug) !== -1);
      card.hidden = !show;
      if (show) {
        visible += 1;
      }
    });

    if (resultCount) {
      resultCount.textContent = visible + (visible === 1 ? " puppy showing" : " puppies showing");
    }

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setFilter(button.dataset.filter);
    });
  });

  setFilter("all");

  /* ---------- Puppy detail dialog ---------- */

  var dialog = document.getElementById("puppy-dialog");
  var dialogPhoto = document.getElementById("dialog-photo");
  var dialogName = document.getElementById("dialog-name");
  var dialogBio = document.getElementById("dialog-bio");
  var dialogAge = document.getElementById("dialog-age");
  var dialogSex = document.getElementById("dialog-sex");
  var dialogBreed = document.getElementById("dialog-breed");
  var dialogSize = document.getElementById("dialog-size");
  var dialogTags = document.getElementById("dialog-tags");
  var dialogGood = document.getElementById("dialog-good");
  var dialogNote = document.getElementById("dialog-note");
  var dialogCta = document.getElementById("dialog-cta");
  var closeButton = dialog ? dialog.querySelector("[data-close]") : null;
  var dialogBody = dialog ? dialog.querySelector(".dialog-body") : null;
  var lastTrigger = null;

  function openProfile(slug, trigger) {
    var puppy = puppies[slug];
    if (!dialog || !puppy) {
      return;
    }

    dialogPhoto.src = "../assets/puppies/" + slug + ".jpg";
    dialogPhoto.alt = puppy.alt;
    dialogName.textContent = puppy.name;
    dialogBio.textContent = puppy.bio;
    dialogAge.textContent = puppy.age;
    dialogSex.textContent = puppy.sex;
    dialogBreed.textContent = puppy.breed;
    dialogSize.textContent = puppy.size;
    dialogGood.textContent = puppy.goodWith;
    dialogNote.textContent = puppy.note;
    dialogCta.href = "mailto:hello@secondchancepaws.org?subject=" +
      encodeURIComponent("Adoption application: " + puppy.name);

    dialogTags.textContent = "";
    puppy.tags.forEach(function (tag) {
      var item = document.createElement("span");
      item.className = "tag";
      item.textContent = tag;
      dialogTags.appendChild(item);
    });

    lastTrigger = trigger || null;

    if (dialogBody) {
      dialogBody.scrollTop = 0;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
    document.documentElement.classList.add("dialog-open");

    window.requestAnimationFrame(function () {
      dialogName.focus();
    });
  }

  function closeProfile() {
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-open]"), function (button) {
    button.addEventListener("click", function () {
      openProfile(button.dataset.open, button);
    });
  });

  if (dialog) {
    if (closeButton) {
      closeButton.addEventListener("click", closeProfile);
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeProfile();
      }
    });

    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeProfile();
    });

    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("dialog-open");
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    });

    dialog.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") {
        return;
      }

      var focusable = Array.prototype.filter.call(
        dialog.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])"),
        function (element) {
          return !element.disabled && element.getClientRects().length > 0;
        }
      );

      if (focusable.length === 0) {
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------- Newsletter ---------- */

  var form = document.querySelector("form[data-newsletter]");
  if (form) {
    var input = form.querySelector('input[type="email"]');
    var error = form.querySelector("#newsletter-error");
    var success = form.querySelector("[data-newsletter-success]");
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = input.value.trim();

      if (!emailPattern.test(value)) {
        error.textContent = value
          ? "That email address doesn't look right. Try hello@example.com."
          : "Enter an email address so we can send you puppy updates.";
        error.hidden = false;
        success.hidden = true;
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }

      error.textContent = "";
      error.hidden = true;
      success.hidden = false;
      input.removeAttribute("aria-invalid");
      form.reset();
    });

    input.addEventListener("input", function () {
      if (!error.hidden && emailPattern.test(input.value.trim())) {
        error.textContent = "";
        error.hidden = true;
        input.removeAttribute("aria-invalid");
      }
    });
  }
})();
