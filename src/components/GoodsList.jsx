import React from 'react';

import { GoodsItem } from './GoodsItem';

function GoodsList(props) {
// получаем массив товаров
    const { goods = [], addToBasket = Function.prototype } = props;
// сообщение при ошибке
    if (!goods.length) {
        return <h3>Nothing here</h3>;
    }

    return (
        <div className='goods'>
            {goods.map((item) => (
                <GoodsItem key={item.id} {...item} addToBasket={addToBasket} />
            ))}
        </div>
    );
}

export { GoodsList };
