const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const e = require("express");
const router = Router()

// Схема роутов
// /api/auth/register
router.post('/register',

    // Validation middleware
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password: min length 6').isLength({min: 6}),

    async (req, res) => {
        try {
            // console.log('Body:', req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации!"
                })
            }

            const {email, password} = req.body
            // Uniq checking
            const candidate = await User.findOne({email: email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }
            // Хэшируем ключ и создаем нового user`a
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email: email, password: hashedPassword})
            // Если все ок => создаем и сохраняем
            await user.save()
            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            res.status(500).json({message: 'Error server!'})
        }
    })


router.post('/login',
    // Validation middleware
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль!').exists(),

    async (req, res) => {
        try {
            console.log(res, req)
            // Сразу проверяем на ошибки
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при авторизации!"
                })
            }
            // Проверка полей при логине
            const {email, password} = req.body
            const user = await User.findOne({email: email})
            if (!user) {
                return res.status(400).json({message: "Пользователь не найден! Зарегистрируйтесь"})
            }
            // Проверка пароля пользователя
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: "Пароль неверный, попробуйте еще раз (УБРАТЬ)"})
            }
            // everything ok =>
            // Что передаем, где берем секретку и время жизни
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Error server!'})
        }
    })


module.exports = router
