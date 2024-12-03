// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
var obj = document.getElementById('main');
obj.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    let scrollY = document.getElementById("main").offsetTop;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = (current.getBoundingClientRect().top + window.pageYOffset) - 50;
        sectionId = current.getAttribute("id");
        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            document.querySelector("a[href*=" + sectionId + "]").classList.add("selected");
        } else {
            document.querySelector("a[href*=" + sectionId + "]").classList.remove("selected");
        }
    });
}

// add smooth scrolling for anchors and sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function searchElement(element, className) {
    let grandparent = element.parentElement?.parentElement;

    if (!grandparent) {
        return null;
    }

    let nextElement = grandparent.nextElementSibling;

    while (nextElement) {
        if (nextElement.classList.contains(className)) {
            return nextElement;
        }
        nextElement = nextElement.nextElementSibling;
    }
    return null;
}

// add EventListener to chart toggle
function elementToggle() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");

            const secondWord = this.textContent.split(" ")[1];

            if (this.classList.contains("active")) {
                    this.textContent = 'hide ' + secondWord;                
            } else {
                    this.textContent = 'show ' + secondWord;
                }     

            console.log(this)
            console.log(this.dataset.linkid)

            if (this.dataset.linkid) {  // Check directly if the property exists
                content = document.getElementById("hook_" + this.dataset.linkid);
            } else {
                content = searchElement(this, 'content');
            }

            console.log(content);
            
            if (content) {  // Ensure content is not null before accessing style
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    }
}
elementToggle();

// add EventListener to pushdown-list toggle
function toggleAriaHiddenOnClickByClass() {
    const elements = document.querySelectorAll('.pushdown');
    let openDiv = null;

    elements.forEach((element) => {
        element.addEventListener('click', function (event) {
            event.stopPropagation();

            let nextSibling = element.nextElementSibling;
            while (nextSibling) {
                if (nextSibling.tagName === 'DIV' && nextSibling.classList.contains('pushdown-list')) {
                    const isHidden = nextSibling.getAttribute('aria-hidden') === 'true';
                    if (openDiv && openDiv !== nextSibling) {
                        openDiv.setAttribute('aria-hidden', 'true');
                    }
                    nextSibling.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
                    openDiv = isHidden ? nextSibling : null;

                    break;
                }
                nextSibling = nextSibling.nextElementSibling;
            }
        });
    });

    document.addEventListener('click', function () {
        if (openDiv) {
            openDiv.setAttribute('aria-hidden', 'true');
            openDiv = null;
        }
    });

    document.addEventListener('click', function (event) {
        if (openDiv && openDiv.contains(event.target)) {
            openDiv.setAttribute('aria-hidden', 'true');
            openDiv = null;
        }
    });

toggleAriaHiddenOnClickByClass();