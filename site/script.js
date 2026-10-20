/* Second Chance Paws — filtering, puppy details, and newsletter validation. */

const puppies = {
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
    alt: "Mochi, a tan Shiba Inu puppy, lies on a white duvet beside a blue ball."
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
    alt: "Biscuit, a pale golden retriever puppy, lies on a cream blanket and looks to the side."
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
    alt: "Pepper, a grey and white border collie puppy, holds a bone while standing in a grassy field."
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
    alt: "Otis, a grey Great Dane puppy with a red collar, stands on a tiled floor."
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
    alt: "Juniper, a black, white, and tan Australian Shepherd puppy, stands on weathered wooden planks."
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
    alt: "Maple, a blue merle Australian Shepherd puppy in a striped sweater, sits on a sandy beach."
  }
};

/* ---------- Filtering ---------- */

const filterButtons = Array.from(document.querySelectorAll("button[data-filter]"));
const puppyCards = Array.from(document.querySelectorAll("[data-puppy]"));
const resultCount = document.querySelector("[data-result-count]");
const emptyState = document.querySelector("[data-empty]");

function matchesFilter(card, filter) {
  if (filter === "all") return true;
  return card.dataset.tags.split(" ").includes(filter);
}

function applyFilter(filter) {
  let visibleCount = 0;

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  });

  puppyCards.forEach((card) => {
    const visible = matchesFilter(card, filter);
    card.hidden = !visible;

    if (visible) {
      card.style.setProperty("--i", visibleCount);
      visibleCount += 1;
    }
  });

  resultCount.textContent = visibleCount === 1 ? "1 puppy" : `${visibleCount} puppies`;
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

/* ---------- Puppy detail dialog ---------- */

const dialog = document.querySelector("[data-dialog]");
const closeButton = dialog.querySelector("[data-close]");
const dialogFields = {
  name: dialog.querySelector("[data-dialog-name]"),
  meta: dialog.querySelector("[data-dialog-meta]"),
  bio: dialog.querySelector("[data-dialog-bio]"),
  size: dialog.querySelector("[data-dialog-size]"),
  good: dialog.querySelector("[data-dialog-good]"),
  note: dialog.querySelector("[data-dialog-note]"),
  tags: dialog.querySelector("[data-dialog-tags]"),
  image: dialog.querySelector("[data-dialog-image]"),
  cta: dialog.querySelector("[data-dialog-cta]")
};

let opener = null;
let closeTimer = 0;

function openDialog(puppyKey, trigger) {
  const puppy = puppies[puppyKey];
  if (!puppy) return;

  opener = trigger;
  dialogFields.name.textContent = puppy.name;
  dialogFields.meta.textContent = `${puppy.age} · ${puppy.sex} · ${puppy.breed}`;
  dialogFields.bio.textContent = puppy.bio;
  dialogFields.size.textContent = puppy.size;
  dialogFields.good.textContent = puppy.good;
  dialogFields.note.textContent = puppy.note;
  dialogFields.tags.replaceChildren(
    ...puppy.tags.map((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      return item;
    })
  );
  dialogFields.image.src = puppy.image;
  dialogFields.image.alt = puppy.alt;
  dialogFields.cta.href =
    "mailto:hello@secondchancepaws.org?subject=" +
    encodeURIComponent(`Adoption application — ${puppy.name}`);

  dialog.classList.remove("is-closing");
  delete dialog.dataset.closing;
  document.documentElement.classList.add("is-locked");
  dialog.showModal();
  closeButton.focus({ preventScroll: true });
}

function closeDialog() {
  if (!dialog.open || dialog.dataset.closing === "true") return;

  dialog.dataset.closing = "true";
  dialog.classList.add("is-closing");
  closeTimer = window.setTimeout(() => dialog.close(), 170);
}

dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDialog();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

/* Native modal dialogs mostly trap focus, but Chromium can drop focus to the
   body when tabbing past the last control. Close the loop explicitly. */
dialog.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;

  const focusable = Array.from(
    dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])")
  ).filter((element) => element.offsetParent !== null);

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

closeButton.addEventListener("click", closeDialog);

dialog.addEventListener("close", () => {
  window.clearTimeout(closeTimer);
  dialog.classList.remove("is-closing");
  delete dialog.dataset.closing;
  document.documentElement.classList.remove("is-locked");

  if (opener && document.contains(opener)) {
    opener.focus({ preventScroll: true });
  }
  opener = null;
});

document.querySelectorAll("[data-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => openDialog(trigger.dataset.open, trigger));
});

/* ---------- Newsletter ---------- */

const newsletter = document.querySelector("[data-newsletter]");
const emailInput = newsletter.querySelector("input[type='email']");
const errorMessage = document.getElementById("email-error");
const successMessage = document.querySelector("[data-newsletter-success]");

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  emailInput.setAttribute("aria-invalid", "true");
  emailInput.focus();
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
  emailInput.removeAttribute("aria-invalid");
}

newsletter.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = emailInput.value.trim();

  if (!value) {
    showError("Enter your email address.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    showError("That email address doesn't look right. Try name@example.com.");
    return;
  }

  clearError();
  newsletter.hidden = true;
  successMessage.hidden = false;
  successMessage.focus({ preventScroll: true });
});

emailInput.addEventListener("input", () => {
  if (!errorMessage.hidden) clearError();
});
