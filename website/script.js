// 密码保护
const PASSWORD = '789123456';

function checkPassword() {
    const overlay = document.getElementById('password-overlay');
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('password-error');
    const submitBtn = document.getElementById('password-submit');
    
    // 提交按钮点击事件
    submitBtn.addEventListener('click', function() {
        validatePassword();
    });
    
    // 回车键提交
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });
    
    function validatePassword() {
        const enteredPassword = input.value;
        
        if (enteredPassword === PASSWORD) {
            // 密码正确
            overlay.classList.add('hidden');
            errorMsg.textContent = '';
        } else {
            // 密码错误
            errorMsg.textContent = '密码错误，请重试';
            input.value = '';
            input.focus();
            
            // 添加抖动效果
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    }
    
    // 页面加载后自动聚焦输入框
    setTimeout(() => {
        input.focus();
    }, 100);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 先检查密码
    checkPassword();
    
    // 等待highlight.js加载完成后再初始化语法高亮
    if (typeof hljs !== 'undefined') {
        initializeSyntaxHighlight();
    } else {
        // 如果hljs还未加载,等待一下再尝试
        setTimeout(function() {
            if (typeof hljs !== 'undefined') {
                initializeSyntaxHighlight();
            }
        }, 500);
    }
    
    // 导航链接点击事件
    setupNavigation();
    
    // 滚动动画
    setupScrollAnimations();
    
    // 代码块交互
    setupCodeBlocks();
});

// 语法高亮初始化
function initializeSyntaxHighlight() {
    // 为曦语言定义自定义高亮规则
    if (typeof hljs !== 'undefined') {
        // 注册曦语言
        hljs.registerLanguage('xi', function(hljs) {
            return {
                case_insensitive: false,
                contains: [
                    // 注释（必须在前面）
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    // 字符串（必须在关键字前面，避免字符串内的关键字被高亮）
                    {
                        className: 'string',
                        begin: '"', 
                        end: '"',
                        contains: [hljs.BACKSLASH_ESCAPE]
                    },
                    // 中文关键字 - 使用简单匹配
                    {
                        className: 'keyword',
                        begin: '想象',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '超类',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '表达',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '跃进',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '若然',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '咳',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '呛',
                        relevance: 10
                    },
                    {
                        className: 'keyword',
                        begin: '返回',
                        relevance: 10
                    },
                    // 运算符关键字 - 使用特殊类名
                    {
                        className: 'operator-keyword',
                        begin: '运算[+\\-*/]',
                        relevance: 10
                    },
                    // 星号高亮（用于指针和可见性）
                    {
                        className: 'symbol',
                        begin: '\\*+',
                        relevance: 5
                    },
                    // 英文类型关键字
                    {
                        className: 'type',
                        begin: '\\b(int|float|bool|char|double|long|unsigned|void)\\b'
                    },
                    // 字面量
                    {
                        className: 'literal',
                        begin: '\\b(true|false)\\b'
                    },
                    // 数字
                    {
                        className: 'number',
                        variants: [
                            { begin: '\\b\\d+\\.\\d+' },
                            { begin: '\\b\\d+' }
                        ],
                        relevance: 0
                    }
                ]
            };
        });
        
        // 高亮所有代码块
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
        console.log('✅ 曦语言语法高亮已注册');
    } else {
        console.error('❌ highlight.js 未加载');
    }
}

// 导航设置
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const sections = document.querySelectorAll('.section');
    const subsections = document.querySelectorAll('.subsection');
    
    // 确保所有二级导航默认展开
    document.querySelectorAll('.sub-nav').forEach(subNav => {
        subNav.classList.add('expanded');
    });
    
    // 主导航点击
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.closest('li').classList.remove('has-active');
            });
            subNavLinks.forEach(l => l.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            this.closest('li').classList.add('has-active');
            
            // 滚动到对应section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 二级导航点击
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除二级导航活动状态
            subNavLinks.forEach(l => l.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            
            // 确保父级导航也是活动的
            const parentLi = this.closest('ul.sub-nav').closest('li');
            const parentNav = parentLi.querySelector('.nav-link');
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.closest('li').classList.remove('has-active');
            });
            if (parentNav) {
                parentNav.classList.add('active');
                parentLi.classList.add('has-active');
            }
            
            // 滚动到对应subsection
            const targetId = this.getAttribute('href').substring(1);
            const targetSubsection = document.getElementById(targetId);
            if (targetSubsection) {
                targetSubsection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时更新活动导航项
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
}

// 更新活动导航项
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const subsections = document.querySelectorAll('.subsection');
    const navLinks = document.querySelectorAll('.nav-link');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    
    let currentSection = '';
    let currentSubsection = '';
    const scrollPosition = window.scrollY + 150;
    
    // 检查subsection
    subsections.forEach(subsection => {
        const subsectionTop = subsection.offsetTop;
        const subsectionHeight = subsection.offsetHeight;
        
        if (scrollPosition >= subsectionTop && scrollPosition < subsectionTop + subsectionHeight) {
            currentSubsection = subsection.getAttribute('id');
        }
    });
    
    // 检查section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // 更新二级导航
    subNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSubsection) {
            link.classList.add('active');
        }
    });
    
    // 更新主导航和父级li的has-active类
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.closest('li').classList.remove('has-active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
            link.closest('li').classList.add('has-active');
        }
    });
}

// 滚动动画
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateElement(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.intro-card, .feature-card, .syntax-item, .example-card, .pipeline-step'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 元素动画
function animateElement(element) {
    if (element.classList.contains('intro-card')) {
        element.style.animation = 'slideUp 0.6s ease forwards';
    } else if (element.classList.contains('feature-card')) {
        element.style.animation = 'expand 0.5s ease forwards';
    } else if (element.classList.contains('pipeline-step')) {
        element.style.animation = 'fadeInUp 0.6s ease forwards';
    }
}

// 代码块交互
function setupCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = '复制代码';
        
        // 添加复制功能
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('code').textContent;
            copyToClipboard(code);
            
            // 显示反馈
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i>';
                this.style.background = '';
            }, 2000);
        });
        
        // 包装代码块
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(copyButton);
    });
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // 备用方法
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// 添加粒子效果（可选）
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 鼠标悬停特效
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.intro-card, .feature-card, .benefit-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// 为卡片添加平滑过渡
const cards = document.querySelectorAll('.intro-card, .feature-card, .benefit-card');
cards.forEach(card => {
    card.style.transition = 'transform 0.1s ease';
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// 添加键盘导航
document.addEventListener('keydown', function(e) {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const activeLink = document.querySelector('.nav-link.active');
    const currentIndex = navLinks.indexOf(activeLink);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % navLinks.length;
        navLinks[nextIndex].click();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[prevIndex].click();
    }
});

// 为数字添加计数动画
function animateNumbers() {
    const numberElements = document.querySelectorAll('.step-number');
    
    numberElements.forEach(el => {
        const target = parseInt(el.textContent);
        let current = 0;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toString().padStart(2, '0');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toString().padStart(2, '0');
            }
        }, 50);
    });
}

// 页面加载完成后的增强效果
window.addEventListener('load', function() {
    // 添加加载完成类
    document.body.classList.add('loaded');
    
    // 延迟执行数字动画
    setTimeout(animateNumbers, 500);
});

// 添加滚动进度指示器
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// 初始化滚动指示器
createScrollIndicator();

// 为特定元素添加打字机效果
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Logo 简单悬停效果
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// 添加平滑的主题切换准备（未来扩展）
let isDarkMode = false;
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
}

// 性能优化：使用防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScroll = debounce(function() {
    // 滚动相关的性能敏感操作
}, 100);

window.addEventListener('scroll', optimizedScroll);

console.log('曦0.01 网站已加载 🌅');
console.log('探索构建性可见性的力量！');
