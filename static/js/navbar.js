// navbar.js

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const dropdowns = document.querySelectorAll(".has-dropdown");

  // Toggle mobile menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("mobile-show");
  });

});

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 1280) {
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  }
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
  // Updated mobileBreakpoint from 1740 to 1280px.
  const mobileBreakpoint = 1280;
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNavMenu = document.getElementById("mobile-nav-menu");
  const body = document.body;

  // Function to update mobile menu state based on viewport width.
  function updateMobileMenu() {
    if (window.innerWidth <= mobileBreakpoint) {
      mobileNavMenu.classList.add("mobile-menu");
    } else {
      mobileNavMenu.classList.remove("mobile-menu");
      mobileNavMenu.classList.remove("mobile-show");
      menuToggle.innerHTML = "&#9776;"; // reset to hamburger
      body.classList.remove("mobile-menu-active");
    }
  }

  updateMobileMenu();
  window.addEventListener("resize", updateMobileMenu);

  // Toggle the mobile overlay menu when the toggle button is clicked.
  menuToggle.addEventListener("click", function () {
    mobileNavMenu.classList.toggle("mobile-show");
    body.classList.toggle("mobile-menu-active");
    if (mobileNavMenu.classList.contains("mobile-show")) {
      // Change icon to an X (close)
      menuToggle.innerHTML = "&times;";
    } else {
      // Change icon back to hamburger
      menuToggle.innerHTML = "&#9776;";
    }
  });

  // Handle mobile nav items with dropdowns for submenu toggling.
  const mobileNavItems = document.querySelectorAll("#mobile-navigation .mobile-nav-item.has-dropdown");
  mobileNavItems.forEach(item => {
    item.addEventListener("click", function (e) {
      // Check if the clicked element is the parent link (not a submenu link)
      if (e.target.classList.contains("mobile-nav-link")) {
        e.preventDefault(); // Prevent default only for parent links
        let submenu = item.querySelector(".mobile-submenu");

        // Close any open submenus
        document.querySelectorAll(".mobile-submenu.open").forEach(openSubmenu => {
          if (openSubmenu !== submenu) {
            openSubmenu.classList.remove("open");
          }
        });

        if (submenu) {
          submenu.classList.toggle("open");
        } else {
          const menuId = item.getAttribute("data-dropdown");
          const children = getMenuChildren(menuId);
          if (children.length > 0) {
            submenu = document.createElement("ul");
            submenu.classList.add("mobile-submenu");
            children.forEach(child => {
              const li = document.createElement("li");
              const a = document.createElement("a");
              a.href = child.url;
              a.textContent = child.name;
              li.appendChild(a);
              submenu.appendChild(li);
            });
            item.appendChild(submenu);
            // Force reflow so the transition is triggered.
            void submenu.offsetHeight;
            submenu.classList.add("open");
          }
        }
      }
    });
  });

  // Example submenu data. Adjust as needed.
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
});
