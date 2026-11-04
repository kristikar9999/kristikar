document.addEventListener('DOMContentLoaded', () => {
    // === МОДАЛЬНОЕ ОКНО ===
    const overlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const openButtons = document.querySelectorAll('[data-open]');
    const tabs = document.querySelectorAll('.modal-tab');
    const forms = {
        register: document.getElementById('registerForm'),
        login: document.getElementById('loginForm')
    };

    function openModal(tabId) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        switchTab(tabId);
    }

    function closeModal() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        
        document.querySelectorAll('.field-error').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.field input').forEach(el => el.parentElement.classList.remove('invalid'));
    }

    function switchTab(tabId) {
        
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });
        
        Object.keys(forms).forEach(key => {
            forms[key].classList.toggle('active', key === tabId);
        });
    }

    // Обработчики
    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(btn.dataset.open);
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // === ВАЛИДАЦИЯ ФОРМ ===
    
  // Функция вывода ошибки
    function showError(input, message) {
        const field = input.closest('.field');
        if (field) field.classList.add('invalid');
        
        // Для чекбокса ошибки
        const errorEl = input.type === 'checkbox' 
            ? document.querySelector('.checkbox-error') 
            : field.querySelector('.field-error');
            
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }
    // Очистка ошибки при вводе
    document.querySelectorAll('.auth-form input').forEach(input => {
        input.addEventListener('input', () => {
            const field = input.closest('.field');
            if (field) field.classList.remove('invalid');
            
            const errorEl = input.type === 'checkbox' 
                ? document.querySelector('.checkbox-error') 
                : field.querySelector('.field-error');
                
            if (errorEl) errorEl.classList.remove('show');
        });
    });

    // Валидация Email
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Отправка формы РЕГИСТРАЦИИ
    forms.register.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName');
        const email = document.getElementById('regEmail');
        const phone = document.getElementById('regPhone');
        const pass = document.getElementById('regPassword');
        const pass2 = document.getElementById('regPassword2');
        const agree = document.getElementById('regAgree');
        let isValid = true;

        // Сброс ошибок
        forms.register.querySelectorAll('.field-error').forEach(el => el.classList.remove('show'));
        forms.register.querySelectorAll('input').forEach(el => el.parentElement.classList.remove('invalid'));

        // Проверки
        if (!name.value.trim()) { showError(name, 'Введите имя'); isValid = false; }
        
        if (!email.value.trim() || !isValidEmail(email.value)) { 
            showError(email, 'Введите корректный Email'); 
            isValid = false; 
        }

        if (!phone.value.trim()) { showError(phone, 'Введите телефон'); isValid = false; }

        if (pass.value.length < 6) { 
            showError(pass, 'Пароль должен быть не менее 6 символов'); 
            isValid = false; 
        }

        if (pass.value !== pass2.value) { 
            showError(pass2, 'Пароли не совпадают'); 
            isValid = false; 
        }

        if (!agree.checked) {
            showError(agree, 'Необходимо согласие на обработку данных');
            isValid = false;
        }

        if (isValid) {
            console.log('📥 Данные регистрации:', {
                name: name.value,
                email: email.value,
                phone: phone.value,
                password: pass.value
            });
            alert('Регистрация успешна! (Смотрите консоль)');
            closeModal();
            forms.register.reset();
        }
    });

    // Отправка формы ВХОДА
    forms.login.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail');
        const pass = document.getElementById('loginPassword');
        let isValid = true;

        // Сброс ошибок
        forms.login.querySelectorAll('.field-error').forEach(el => el.classList.remove('show'));
        forms.login.querySelectorAll('input').forEach(el => el.parentElement.classList.remove('invalid'));

        if (!email.value.trim() || !isValidEmail(email.value)) { 
            showError(email, 'Введите корректный Email'); 
            isValid = false; 
        }
        
        if (!pass.value.trim()) { 
            showError(pass, 'Введите пароль'); 
            isValid = false; 
        }

        if (isValid) {
            console.log('📥 Данные входа:', {
                email: email.value,
                password: pass.value
            });
            alert('Вход выполнен! (Смотрите консоль)');
            closeModal();
            forms.login.reset();
        }
    });
});