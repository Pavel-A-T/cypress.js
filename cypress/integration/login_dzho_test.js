const login = 'german@dolnikov.ru';
const password = 'iLoveqastudio1';
const incorrectAnswer = 'Такого логина или пароля нет';


describe('Тестирование ввода логина и пароля', function () {
    it('Позитивный кейс: ввод правильного пароля и правильного логина', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type(login);
        cy.get('#pass').type(password);
        cy.get('#loginButton').click();
        cy.contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon');
        })

    it('Позитивный кейс: проверка логики восстановления пароля', function () {
        const text = 'Успешно отправили пароль на e-mail';
        cy.reload();
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type(login);
        cy.get('#restoreEmailButton').click();
        cy.contains(text);
        cy.get('#exitMessageButton > img');
    })

    it('Негативный кейс: ввод неправильного пароля', function () {
        const incorrectPassword = 'pass';
        cy.reload();
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type(login);
        cy.get('#pass').type(incorrectPassword);
        cy.get('#loginButton').click();
        cy.contains(incorrectAnswer);
        cy.get('#exitMessageButton > img');
    })

    it('Негативный кейс: ввод неправильного логина', function () {
        const incorrectLogin = 'df@dfe.ru';
        cy.reload();
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type(incorrectLogin);
        cy.get('#pass').type(password);
        cy.get('#loginButton').click();
        cy.contains(incorrectAnswer);
        cy.get('#exitMessageButton > img');
    })

    it('Негативный кейс: ввод логина без "@"', function () {
        const text = 'Нужно исправить проблему валидации';
        cy.reload();
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type('dfwdjr.rt');
        cy.get('#pass').type(password);
        cy.get('#loginButton').click();
        cy.contains(text);
        cy.get('#exitMessageButton > img');
    })

    it('Позитивный кейс: приведение Логина к нижнему регистру', function () {
        let log = 'GerMan@Dolnikov.ru';
        cy.reload();
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').type(log.toLowerCase());
        cy.get('#pass').type(password);
        cy.get('#loginButton').click();
        cy.contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon');
        })
        
    it('Позитивный кейс: Проверка покупки на сайте https://testqastudio.me/', function () {
        const basketButton = '.summary > .cart > .product-button-wrapper > .single_add_to_cart_button';
        cy.reload();
        cy.visit('https://testqastudio.me/');
        cy.get('.post-11342 > .product-inner > .product-thumbnail > .woocommerce-LoopProduct-link > .attachment-woocommerce_thumbnail').click();
        let quantity = cy.get('.summary > .cart > .product-button-wrapper > .quantity > .increase');
        quantity.click();
        quantity.click();
        cy.get(basketButton).click();
        cy.get('#menu-top > .menu-item-home > a').click();
        cy.get('.post-11337 > .product-inner > .product-thumbnail > .woocommerce-LoopProduct-link > .attachment-woocommerce_thumbnail').click();
        cy.get(basketButton).click();
        cy.wait(6000);
        cy.get('.checkout').click();
        cy.get('#billing_first_name').type('Иванов');
        cy.get('#billing_last_name').type('Иван');
        cy.get('#billing_address_1').type('Строителей 55 кв 46');
        cy.get('#billing_city').type('Moscou');
        cy.get('#billing_state').type('Moscou');
        cy.get('#billing_postcode').type('117142');
        cy.get('#billing_phone').type('+78954217868');
        cy.get('#billing_email').type(login); 
        cy.get('#place_order').click();
        cy.contains('БРОММС Двухместная кровать');
        cy.contains('КЛЛАРИОН Низкий столик');
        cy.get('.woocommerce-Price-amount').contains('47,800.00 ₽');
        cy.close;
    })
})