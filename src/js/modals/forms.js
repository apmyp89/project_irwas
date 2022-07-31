import { post } from "jquery";

const forms = () => {
    //Получаем эллементы которые понадобятся 
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name=user"phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () =>{
            item.value = item.value.replace(/\D/, '');
        });  
    });
    //Создаём объект с сообщениями
    const message = {
        loading: 'Загрузка...',
        succes: 'Спасибо, мы с Вами свяжемся',
        failure: 'Что-то пошло не так...',
    };
    //Функция которая создаёт запрос
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await res.text();
    };
    //Функция по очищению инпутов
        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
        };
    
    form.forEach(item => {
        //При отправке данных страница не будет перезагружаться
        item.addEventListener('submit', (e) => {
            e.preventDefault();
        //создём блок в который будем помещать сообщения
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('.status');
        item.appendChild(statusMessage);

        //собираем все данны из формы
        const formData = new FormData(item);
        //Отправляем запрос на сервер
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.succes;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;