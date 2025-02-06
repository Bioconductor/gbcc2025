document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const dropdowns = document.querySelectorAll(".has-dropdown");

  // Toggle mobile menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });

  // Dropdowns expand inline on mobile
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".custom-navbar");
  const body = document.body;

  let lastScrollTop = 0;
  
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
      // Scrolling down - allow content to go under navbar
      body.classList.add("scrolled");
    } else {
      // Scrolling up - restore the padding
      body.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownContainer = document.querySelector(".dropdown-container");
  const dropdownContent = document.getElementById("dropdown-content");
  const navItems = document.querySelectorAll(".nav-item.has-dropdown");

  function showDropdown() {
    dropdownContent.innerHTML = ""; // Clear previous content

    navItems.forEach(parentItem => {
        const menuId = parentItem.getAttribute("data-dropdown");
        const menuChildren = getMenuChildren(menuId);

        if (menuChildren.length > 0) {
            const dropdownColumn = document.createElement("div");
            dropdownColumn.classList.add("dropdown-column");

            const ul = document.createElement("ul");

            menuChildren.forEach(child => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = child.url;
                a.textContent = child.name;
                li.appendChild(a);
                ul.appendChild(li);
            });

            dropdownColumn.appendChild(ul);
            dropdownContent.appendChild(dropdownColumn);

            // Get parent width and apply to dropdown column
            const parentWidth = parentItem.getBoundingClientRect().width;
            dropdownColumn.style.width = `${parentWidth}px`; // Set width exactly
        }
    });

    dropdownContainer.style.display = "flex"; // Ensures proper alignment
  }

  function hideDropdown() {
    dropdownContainer.style.display = "none";
  }

  function getMenuChildren(menuId) {
    const menuData = {
      "gbcc2025": [
        { name: "Greetings", url: "/about/greetings" },
        { name: "Overview", url: "/about/overview" },
        { name: "Committee", url: "/about/committee" },
        { name: "Venue", url: "/about/venue" },
        { name: "Previous Meetings", url: "/about/previous_meetings" }
      ],
      "program": [
        { name: "Program at a Glance", url: "/program/glance" },
        { name: "Scientific Program", url: "/program/scientific_program" },
        { name: "Invited Speakers", url: "/program/keynotes" }
      ],
      "abstracts": [
        { name: "Submission Guidelines", url: "/abstracts/submission_guidelines" },
        { name: "Abstract Book", url: "/abstracts/book" }
      ],
      "registration": [
        { name: "Conference Registration", url: "/registration/conference" },
        { name: "Cofest Registration", url: "/registration/cofest" },
        { name: "Scholarships", url: "/registration/scholarships" }
      ],
      "sponsor": [
        { name: "Sponsor Information", url: "/sponsorships/sponsor_info" }
      ],
      "general_info": [
        { name: "Transportation", url: "/general_information/transportation" },
        { name: "Things to do in the Area", url: "/general_information/things_to_do" },
        { name: "Logo Gallery", url: "/general_information/logo_contest_gallery" }
      ],
      "cofest": [
        { name: "Cofest Overview", url: "/cofest/overview" },
        { name: "Past Projects", url: "/cofest/past_projects" },
        { name: "Venue Information", url: "/cofest/venue_info" },
        { name: "Proposed Projects", url: "/cofest/proposed_projects" }
      ],
      "bofs": [
        { name: "BOFs Overview", url: "/bofs/overview" }
      ]
    };

    return menuData[menuId] || [];
  }

  navItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      showDropdown();
    });
  });

  dropdownContainer.addEventListener("mouseleave", function () {
    hideDropdown();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.querySelector(".custom-navbar");
  const navbarLogo = document.querySelector(".navbar-header");

  function adjustNavbar() {
    const navbarWidth = navbar.offsetWidth;
    const logoWidth = navbarLogo.offsetWidth;
    const availableSpace = navbarWidth - logoWidth - 50; // Ensure 50px buffer

    if (availableSpace < 400) { // If nav can't fit, switch to mobile view
      navMenu.classList.add("mobile-view");
      navMenu.style.display = "none";
      menuToggle.style.display = "block";
    } else {
      navMenu.classList.remove("mobile-view");
      navMenu.style.display = "flex";
      menuToggle.style.display = "none";
    }
  }

  // Run adjustment on load & window resize
  adjustNavbar();
  window.addEventListener("resize", adjustNavbar);

  // Toggle mobile menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});