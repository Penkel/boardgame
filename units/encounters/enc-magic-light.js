import GameObject from "../game-obj.js";

export default class MagicLight extends GameObject {
    constructor(x,y) {
        super(x,y, 'magic light.jpg', 'Волшебный Свет', 0) 
        this.encounter = [
            {
                id: 0,
                text: 'Вы видите волшебный свет. Вы можете прикоснуться к нему, если хотите',
                options: [
                    {
                        text: 'Прикоснуться к свету',
                        type: 'random',
                        ways: [1,2,3]
                    },
                    {
                        text: 'Уйти',
                        type: 'end'
                    }
                ]
            },
            {
                id: 1,
                text: 'Магический огонь сильно обжог вас!',
                options: [
                    {
                        text: 'Больно...',
                        type: 'end'
                    }
                ]
            },
            {
                id: 2,
                text: 'Вы были вылечены странной древней магией..',
                options: [
                    {
                        text: 'Приятный сюрприз...',
                        type: 'end'
                    }
                ]
            },
            {
                id: 3,
                text: 'Магический свет, похоже, не дает никакого эффекта',
                options: [
                    {
                        text: 'Лучше так, чем...',
                        type: 'end'
                    }
                ]
            }
        ]
    }
}