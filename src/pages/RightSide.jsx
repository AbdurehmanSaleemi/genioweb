import React, { useEffect, useMemo, useState } from 'react'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Features from './Features'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import openai from '../Openai'
import { Helmet } from 'react-helmet';
import '../App.css'

function RightSide(props) {
    const [showOuput, setShowOutput] = useState(false)
    const [title, setTitle] = React.useState('')
    const [menu, setMenu] = useState([])
    const [heroTitle, setHeroTitle] = React.useState('')
    const [heroSubTitle, setHeroSubTitle] = React.useState('')
    const [value, setValue] = useState(0)
    const [cta, setCta] = useState('')
    const [contactCTA, setContactCTA] = useState('')
    const [aboutHeader, setAboutHeader] = useState('')
    const [contactHeader, setContactHeader] = useState('')

    const [loading, setLoading] = useState('')
    const [showProgress, setShowProgress] = useState(false)
    const [text, setText] = useState('El sitio web generado aparecerá aquí')
    const [laoding2, setLoading2] = useState('')

    const [feature, setFeature] = React.useState([
        {
            id: 1,
            title: 'Feature 1',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem.'
        },
        {
            id: 2,
            title: 'Feature 2',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem.'
        },
        {
            id: 3,
            title: 'Feature 3',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem.'
        },
    ])
    const [aboutUs, setAboutUs] = React.useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lorem.')

    const [contactSub, setContactSub] = React.useState('We are always open to talk to you. Feel free to contact us anytime.')

    const generateTitle = async () => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user", content: `Generate only one catchy and professional two-word business names in case the user does not have a name”. If it has a name of the company, then use theirs but dont add .com or anything else: ${props.userInput}. Give me answer in Spanish Language`
            }
            ],
        });
        let title = completion.data.choices[0].message.content
        // remoe inverted commas
        title = title.replace(/"/g, '')
        setTitle(title)
    }

    const generateMenu = async () => {
        let prompt = `Generate a list of 3-5 website header menu items in Spanish Language (for example home, about us, contact us etc) that should be placed at top of website for navigation for this website idea (Keep menu item one word): ${props.userInput}`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        let menuItems = completion.data.choices[0].message.content.split('\n')
        // remove numbers from menu items
        menuItems = menuItems.map((item) => {
            return item.split('.').slice(1).join('.')
        })
        setMenu(menuItems)
    }

    const generateHero = async () => {
        let prompt = `Generate a catchy short website punchline in Spanish Language for this website idea: ${props.userInput}. Dont add (") in result`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        let punchline = completion.data.choices[0].message.content
        // remove inverted commas
        punchline = punchline.replace(/"/g, '')
        setHeroTitle(punchline)
    }

    const generateCTA = async () => {
        console.log('generating cta')
        let prompt = `Generate a one catchy (max three words) website CTA for this website idea in Spanish Language: ${props.userInput} that'll go in header. Dont add (") in result`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        let cta = completion.data.choices[0].message.content
        // remove inverted commas
        cta = cta.replace(/"/g, '')
        setCta(cta)
    }


    const generateSubTitle = async () => {
        let prompt = `Generate a catchy short website subtitle for this website idea in Spanish Language: ${props.userInput}. The title is ${heroTitle}. Dont add (") in result`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        let subtitle = completion.data.choices[0].message.content
        // remove inverted commas
        subtitle = subtitle.replace(/"/g, '')
        setHeroSubTitle(subtitle)
    }

    const generateFeatures = async () => {
        console.log('generating features')
        let prompt = `Generate a list of maximum 3 website features (for example fast delivery, best quality, 24/7 support etc) that should be placed on website homepage for this website idea in Spanish Language: ${props.userInput}.`

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user", content: prompt
            },
            { role: "assistant", content: "Keep output in this format: Name of Feature: Description of Feature" },
            ],
        });
        let features_ = completion.data.choices[0].message.content.split('\n')
        let featuresList = []
        features_.forEach((feature) => {
            let featureTitle = feature.split(':')[0]
            let featureDesc = feature.split(':')[1]
            featuresList.push({
                id: featuresList.length + 1,
                title: featureTitle,
                desc: featureDesc
            })
        })
        // remove empty items
        featuresList = featuresList.filter((item) => {
            return item.title !== ''
        })
        // remove numbers from menu items
        featuresList = featuresList.map((item) => {
            return {
                id: item.id,
                title: item.title.split('.').slice(1).join('.'),
                desc: item.desc
            }
        })
        setFeature(featuresList)
    }

    const generateAboutUs = async () => {
        console.log('generating about us')
        let prompt = `Generate a short about us (maximum 35 words) paragraph for this website idea in Spanish Language: ${props.userInput}. Dont add (") in result`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        setAboutUs(completion.data.choices[0].message.content)
    }

    const generateContact = async () => {
        console.log('generating contact')
        let prompt = `Generate a short (maximum 15 words) contact us paragraph for this website idea in Spanish Language: ${props.userInput}. Dont add (") in result`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        setContactSub(completion.data.choices[0].message.content)
    }

    const generateAboutHeader = async () => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: `Generate only one super small catchy and professional "About Us" section header for this idea in Spanish Language: ${props.userInput}. Keep it short (max 5 words)`
            }],
        });
        let header = completion.data.choices[0].message.content
        // remove inverted commas
        header = header.replace(/"/g, '')
        setAboutHeader(header)
    }

    const generateContactHeader = async () => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: `Generate only one super small catchy and professional "Contact Us" section header in Spanish Language for this idea : ${props.userInput}. Keep it short (max 5 words)`
            }],
        });
        let header_ = completion.data.choices[0].message.content
        // remove inverted commas
        header_ = header_.replace(/"/g, '')
        setContactHeader(header_)
    }

    const generateContactCTA = async () => {
        console.log('generating contact cta')
        let prompt = `Generate a (max three words) "Contact us" section CTA for this website idea in Spanish Language: ${props.userInput}. Dont add (") in result. Examples: "Contact us", "Get in touch", "Reach out to us" etc.`
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant", content: prompt
            }],
        });
        let cta = completion.data.choices[0].message.content
        // remove inverted commas
        cta = cta.replace(/"/g, '')
        setContactCTA(cta)
    }

    const resetAll = () => {
        setShowProgress(false)
        setShowOutput(false)
        setAboutHeader('')
        setContactHeader('')
        setTitle('')
        setMenu([])
        setHeroTitle('')
        setHeroSubTitle('')
        setCta('')
        setFeature([])
        setAboutUs('')
        setContactSub('')
        setContactCTA('')
    }

    const generateAll = async () => {
        setText(' ')
        setValue(0)
        resetAll()
        setShowProgress(true)
        setLoading('🛠 Diseñando')
        setLoading2('Pagina Web')
        await generateTitle()
        setValue(10)
        await generateMenu()
        setValue(20)
        setLoading('📝 Escribiendo')
        setLoading2('Textos')
        await generateHero()
        setValue(30)
        await generateSubTitle()
        setValue(40)
        await generateCTA()
        setValue(50)
        setLoading('🖥 Programando')
        setLoading2('Secciones')
        await generateFeatures()
        setValue(60)
        setLoading('✨ Generando')
        setLoading2('Sección de Contacto')
        await generateAboutHeader()
        await generateAboutUs()
        setValue(70)
        setLoading('💜 Diseńando')
        setLoading2('Versión Móvil')
        await generateContactHeader()
        setValue(80)
        await generateContact()
        setValue(90)
        await generateContactCTA()
        setValue(100)
        setLoading('')
        setShowProgress(false)
        setShowOutput(true)
        setText('El sitio web generado aparecerá aquí')
    }

    useEffect(() => {
        if (props.startGenerating) {
            generateAll()
            props.setStartGenerating(false)
        }
    }, [props.startGenerating])

    return (
        <div className='flex flex-col min-h-screen'>
            <Helmet title={title} />
            {showOuput ? <div className='flex flex-col w-full h-full'>
                <Header menu={menu} title={title} />
                <Hero heroTitle={heroTitle} heroSub={heroSubTitle} cta={cta} />
                <Features features={feature} />
                <AboutUs aboutUs={aboutUs} aboutHeader={aboutHeader} />
                <Contact contactSub={contactSub} contactHeader={contactHeader} contactCTA={contactCTA} />
                <Footer menu={menu} title={title} />
            </div> :
                <div className='flex flex-col w-full h-screen justify-center items-center bg-white'>
                    {value !== 0 ? <h1 className='md:text-2xl font-bold text-green-500'>{value}%</h1> : <h1 className='md:text-2xl font-bold text-white'>{value}%</h1>}
                    <h1 className='md:text-2xl font-bold text-black'>{text}</h1>
                    {showProgress ? <div className='flex flex-row w-2/3 md:w-1/3 items-center justify-center'>
                        <progress className='w-full mt-8 transition-all ease-linear' value={value} max={100}> {value}% </progress>
                    </div> : null}
                    <div className='flex flex-row space-x-2 mt-7 items-center'>
                        <h1 className='md:text-xl font-bold text-green-500'>{loading}</h1>
                        <h1 className='md:text-xl font-bold text-black'>{laoding2}</h1>
                    </div>
                </div>}
        </div>
    )
}

export default RightSide