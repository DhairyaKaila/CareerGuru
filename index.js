class CareerChatApp {
  constructor() {
    this.chatSection = document.getElementById("chatSection");
    this.chatMessages = document.getElementById("chatMessages");
    this.chatInput = document.getElementById("chatInput");
    this.chatSend = document.getElementById("chatSend");
    this.chatToggle = document.getElementById("chatToggle");
    this.closeChat = document.getElementById("closeChat");
    this.startChat = document.getElementById("startChat");
    this.typingIndicator = document.getElementById("typingIndicatorChat");
    this.isWaitingForResponse = false;

    this.init();
  }

  init() {
    // Event listeners
    this.chatToggle.addEventListener("click", () => this.toggleChat());
    this.startChat.addEventListener("click", () => this.openChat());
    this.closeChat.addEventListener("click", () => this.closeChatWindow());
    this.chatSend.addEventListener("click", () => this.sendMessage());
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    this.chatSection.classList.toggle("active");
  }

  openChat() {
    this.chatSection.classList.add("active");
  }

  closeChatWindow() {
    this.chatSection.classList.remove("active");
  }

  async sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message || this.isWaitingForResponse) return;

    this.addMessage(message, "user");
    this.chatInput.value = "";

    this.showTyping();

    try {
      const response = await this.getCareerResponse(message);
      this.hideTyping();
      this.addMessage(response, "assistant");
    } catch (error) {
      this.hideTyping();
      this.addMessage(
        "Sorry, I encountered an error. Please try again.",
        "assistant"
      );
    }
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const bubbleDiv = document.createElement("div");
    bubbleDiv.className = "message-bubble";
    bubbleDiv.innerHTML = this.formatMessage(content);

    messageDiv.appendChild(bubbleDiv);
    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  formatMessage(content) {
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    content = content.replace(/\*(.*?)\*/g, "<em>$1</em>");
    content = content.replace(
      /`(.*?)`/g,
      '<code style="background: #e2e8f0; padding: 2px 4px; border-radius: 4px;">$1</code>'
    );
    content = content.replace(/\n/g, "<br>");
    return content;
  }

  showTyping() {
    this.isWaitingForResponse = true;
    this.chatSend.disabled = true;
    this.typingIndicator.style.display = "block";
    this.scrollToBottom();
  }

  hideTyping() {
    this.isWaitingForResponse = false;
    this.chatSend.disabled = false;
    this.typingIndicator.style.display = "none";
  }

  async getCareerResponse(userMessage) {
    await this.delay(1000 + Math.random() * 2000);
    return this.generateCareerResponse(userMessage);
  }

  generateCareerResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Career-specific responses
    if (
      lowerMessage.includes("software") ||
      lowerMessage.includes("programming") ||
      lowerMessage.includes("developer")
    ) {
      return "**Software Development Career Path** 💻\n\n**Popular roles:**\n• Frontend Developer (React, Vue, Angular)\n• Backend Developer (Node.js, Python, Java)\n• Full Stack Developer\n• Mobile App Developer\n• DevOps Engineer\n\n**Skills needed:**\n• Programming languages (JavaScript, Python, Java)\n• Problem-solving and logical thinking\n• Database management\n• Version control (Git)\n\n**Salary range:** ₹3-25 LPA depending on experience\n\nWould you like specific guidance on any programming language or role?";
    }

    if (
      lowerMessage.includes("data science") ||
      lowerMessage.includes("data analyst") ||
      lowerMessage.includes("machine learning")
    ) {
      return "**Data Science Career Path** 📊\n\n**Popular roles:**\n• Data Scientist\n• Data Analyst\n• Machine Learning Engineer\n• Business Intelligence Analyst\n• Data Engineer\n\n**Skills needed:**\n• Python/R programming\n• Statistics and mathematics\n• SQL and databases\n• Data visualization (Tableau, Power BI)\n• Machine learning libraries\n\n**Salary range:** ₹4-30 LPA depending on experience\n\nWhich aspect of data science interests you most?";
    }

    if (
      lowerMessage.includes("digital marketing") ||
      lowerMessage.includes("marketing") ||
      lowerMessage.includes("seo")
    ) {
      return "**Digital Marketing Career Path** 📱\n\n**Popular roles:**\n• Digital Marketing Manager\n• SEO Specialist\n• Social Media Manager\n• Content Marketing Manager\n• PPC Specialist\n\n**Skills needed:**\n• Content creation and copywriting\n• SEO and SEM knowledge\n• Analytics tools (Google Analytics)\n• Social media platforms\n• Email marketing\n\n**Salary range:** ₹2-15 LPA depending on experience\n\nWhat area of digital marketing would you like to focus on?";
    }

    if (
      lowerMessage.includes("design") ||
      lowerMessage.includes("ui") ||
      lowerMessage.includes("ux")
    ) {
      return "**UX/UI Design Career Path** 🎨\n\n**Popular roles:**\n• UX Designer\n• UI Designer\n• Product Designer\n• Graphic Designer\n• Design Researcher\n\n**Skills needed:**\n• Design tools (Figma, Sketch, Adobe XD)\n• User research and testing\n• Prototyping and wireframing\n• Understanding of design principles\n• Empathy and user-centered thinking\n\n**Salary range:** ₹3-20 LPA depending on experience\n\nAre you more interested in UX research or visual design?";
    }

    if (
      lowerMessage.includes("cybersecurity") ||
      lowerMessage.includes("security") ||
      lowerMessage.includes("ethical hacking")
    ) {
      return "**Cybersecurity Career Path** 🔒\n\n**Popular roles:**\n• Cybersecurity Analyst\n• Ethical Hacker/Penetration Tester\n• Security Engineer\n• Information Security Manager\n• Cybersecurity Consultant\n\n**Skills needed:**\n• Network security knowledge\n• Understanding of security frameworks\n• Penetration testing tools\n• Risk assessment\n• Continuous learning mindset\n\n**Salary range:** ₹4-25 LPA depending on experience\n\nWhich area of cybersecurity interests you most?";
    }

    // Career guidance questions
    if (
      lowerMessage.includes("career change") ||
      lowerMessage.includes("switch career")
    ) {
      return "**Career Change Guidance** 🔄\n\n**Steps for successful career transition:**\n\n1. **Self Assessment**: Identify your transferable skills\n2. **Research**: Study your target industry thoroughly\n3. **Skill Gap Analysis**: Determine what new skills you need\n4. **Network**: Connect with professionals in your target field\n5. **Gradual Transition**: Consider freelancing or part-time work first\n\n**Tips:**\n• Highlight transferable skills on your resume\n• Get relevant certifications\n• Build a portfolio in your new field\n• Be patient - career changes take time\n\nWhat field are you looking to transition into?";
    }

    if (
      lowerMessage.includes("interview") ||
      lowerMessage.includes("interview tips")
    ) {
      return "**Interview Preparation Tips** 🤝\n\n**Before the interview:**\n• Research the company thoroughly\n• Practice common interview questions\n• Prepare your STAR stories\n• Plan your outfit and route\n\n**During the interview:**\n• Arrive 10-15 minutes early\n• Maintain good eye contact\n• Ask thoughtful questions\n• Show enthusiasm for the role\n\n**Common questions to prepare:**\n• Tell me about yourself\n• Why do you want this role?\n• What are your strengths/weaknesses?\n• Where do you see yourself in 5 years?\n\nWould you like me to help you practice answers to any specific questions?";
    }

    if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return "**Resume Building Tips** 📝\n\n**Essential sections:**\n• Contact information\n• Professional summary (2-3 lines)\n• Work experience (reverse chronological)\n• Skills (relevant to the job)\n• Education\n• Projects/Certifications (if relevant)\n\n**Best practices:**\n• Keep it 1-2 pages maximum\n• Use action verbs (achieved, managed, created)\n• Quantify your achievements with numbers\n• Customize for each job application\n• Use a clean, professional format\n• Proofread multiple times\n\n**Common mistakes to avoid:**\n• Generic resumes\n• Spelling/grammar errors\n• Including irrelevant information\n• Using unprofessional email addresses\n\nWould you like help with any specific section of your resume?";
    }

    if (lowerMessage.includes("salary") || lowerMessage.includes("negotiate")) {
      return "**Salary Negotiation Guide** 💰\n\n**Research phase:**\n• Use websites like Glassdoor, PayScale\n• Network with industry professionals\n• Consider location and company size\n• Factor in total compensation (benefits, perks)\n\n**Negotiation tips:**\n• Wait for the offer before discussing salary\n• Express gratitude first\n• Present your case with data\n• Be prepared to compromise\n• Consider non-monetary benefits\n\n**What to negotiate:**\n• Base salary\n• Joining bonus\n• Flexible working hours\n• Professional development budget\n• Additional vacation days\n\nWhat's your current situation? Are you preparing for a new job or looking to negotiate your current salary?";
    }

    // Skills development
    if (
      lowerMessage.includes("skills") ||
      lowerMessage.includes("learn") ||
      lowerMessage.includes("courses")
    ) {
      return "**Skill Development Recommendations** 📚\n\n**In-demand skills for 2024:**\n• **Technical**: AI/ML, Cloud computing, Cybersecurity\n• **Digital**: Data analysis, Digital marketing, UX/UI design\n• **Soft skills**: Communication, Leadership, Adaptability\n\n**Learning platforms:**\n• **Free**: YouTube, freeCodeCamp, Coursera (audit)\n• **Paid**: Udemy, Pluralsight, LinkedIn Learning\n• **Interactive**: Codecademy, LeetCode, HackerRank\n\n**Learning strategy:**\n• Set clear goals\n• Practice consistently (20-30 min daily)\n• Build projects to apply knowledge\n• Join communities and forums\n• Get feedback from peers\n\nWhat specific skills are you looking to develop?";
    }

    // General greetings
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! 👋 I'm your AI Career Guide. I'm here to help you with career planning, job search strategies, skill development, and much more!\n\nWhat career topic would you like to discuss today?";
    }

    if (lowerMessage.includes("thank")) {
      return "You're very welcome! 😊 I'm here to help you succeed in your career journey. Feel free to ask me anything about careers, job search, skills, or professional development anytime!";
    }

    // Default career-focused response
    const careerResponses = [
      "That's a great career question! I can help you with various aspects including job search strategies, skill development, interview preparation, and career planning. Could you be more specific about what you'd like to know?",
      "I'm here to guide your career journey! Whether you're looking for career advice, job search tips, skill recommendations, or industry insights, I can help. What specific area interests you?",
      "Career development is exciting! I can assist with career planning, resume building, interview prep, salary negotiation, and much more. What would you like to focus on?",
      "Let me help you with your career goals! I offer guidance on job searching, skill building, career transitions, and professional development. What's your main concern right now?",
    ];

    return careerResponses[Math.floor(Math.random() * careerResponses.length)];
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }, 100);
  }
}

// Global function for career cards
function askAboutCareer(career) {
  const chatApp = window.careerChatApp;
  chatApp.openChat();
  setTimeout(() => {
    chatApp.chatInput.value = `Tell me about ${career} career`;
    chatApp.sendMessage();
  }, 500);
}

// Initialize the chat app when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.careerChatApp = new CareerChatApp();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background =
      "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background =
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    navbar.style.backdropFilter = "none";
  }
});

// Add animation on scroll for service cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe service cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });
});
