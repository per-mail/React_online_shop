import React from 'react';

import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';

import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';

function Shop() {
// состояние - товары, изначально здесь пусто
    const [goods, setGoods] = useState([]);
// загрузка
    const [loading, setLoading] = useState(true);
// список заказов
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketSow] = useState(false);
    const [alertName, setAlertName] = useState('');

// функция добавляет товары в корзину
// получаем новый обьект item, который содержит Id, name,price,  проверяем если ранее не был добавлен, добавляем 1 в quantity    
    const addToBasket = (item) => {
// обходим весь список товаров
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        );
// if (itemIndex < 0) - если корзина пуста
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
// передаём новый ордер в State
            setOrder(newOrder);
        }

 //  устанавливаем  setAlertName  по  item.name)       
        setAlertName(item.name);
    };

// удаление товара из корзины, используем id товара
    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    };

// увеличиваем кол-во товара в корзине
    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

// уменьшаем кол-во товара в корзине  
    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const handleBasketShow = () => {
        setBasketSow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName('');
    };

// функция которая с помощью useEffect загружает все товары, и ложит их сюда const [goods, setGoods] = useState([]);
    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            });
    }, []);

// Cart quantity - кол-во товаров в корзине
    return (
        <main className='container content'>
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
{/* если идёт загрузка показываем Preloader если нет то список товаров */}
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
            )}
            {isBasketShow && (
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
        </main>
    );
}

export { Shop };
