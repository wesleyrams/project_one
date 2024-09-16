const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.CHAVE_SECRET);
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const QRCode = require('qrcode');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro de conexão MongoDB:', error));

// Definir o modelo de casal (Couple Model)
const coupleSchema = new mongoose.Schema({
    generatedId: { type: String, required: true, unique: true },
    couplename: String,
    relationshipDate: String,
    relationshipTime: String,
    message: String,
    plan: String,
    youtubeVideo: String,
    files: [String], // Armazena URLs das imagens
});

const Couple = mongoose.model('Couple', coupleSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const { v4: uuidv4 } = require('uuid');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar o Multer para salvar imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Endpoint para criar casal
app.post('/create-couple', upload.array('files', 7), async (req, res) => {
    try {
        const { couplename, relationshipDate, relationshipTime, message, plan, youtubeVideo } = req.body;
        const generatedId = uuidv4();

        // Gerar URLs para as imagens carregadas
        const fileUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        // Criar um novo casal e salvar no MongoDB
        const newCouple = new Couple({
            generatedId,
            couplename,
            relationshipDate,
            relationshipTime,
            message,
            plan,
            youtubeVideo,
            files: fileUrls,
        });

        await newCouple.save();

        console.log('Casal criado:', newCouple);

        res.status(200).json({ message: 'Casal criado com sucesso!', couple: newCouple, coupleId: newCouple._id.toString() });
    } catch (error) {
        console.error('Erro ao criar casal:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});






// Endpoint para criar uma sessão de checkout com Stripe
app.post('/create-checkout-session', async (req, res) => {
    const { plan, coupleId } = req.body; // Recebe o 'coupleId' e o 'plan' do frontend

    // Definir o ID de preço com base no plano escolhido
    let priceId;
    switch (plan) {
        case 'BASIC':
            priceId = 'price_1PyhQJIJ8yWIAToiES4fDU7X';
            break;
        case 'PRO':
            priceId = 'price_1PzlfwIJ8yWIAToiDxWmmmkV';
            break;
        default:
            return res.status(400).json({ error: 'Plano inválido' });
    }

    try {
        // Criar uma sessão de checkout com Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}&coupleId=${coupleId}`, // Inclua o 'coupleId' na URL de sucesso
            cancel_url: 'http://localhost:8080/cancel',
        });

        // Retorna o ID da sessão de checkout para o frontend
        res.json({ id: session.id });
    } catch (error) {
        console.error(`Erro ao criar sessão: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para buscar e exibir informações do casal
app.get('/couple/:id', async (req, res) => {
    const coupleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(coupleId)) {
        return res.status(400).send("ID inválido");
    }

    try {
        const coupleData = await Couple.findOne({ _id: coupleId });

        if (!coupleData) {
            return res.status(404).json({ error: 'Casal não encontrado' });
        }

        const relationshipDate = new Date(coupleData.relationshipDate);
        const now = new Date();

        function calculateTimeDifference(startDate, endDate) {
            const a = startDate;
            const s = endDate;

            let r = s.getFullYear() - a.getFullYear();
            let i = s.getMonth() - a.getMonth();
            let l = s.getDate() - a.getDate();
            let n = s.getHours() - a.getHours();
            let o = s.getMinutes() - a.getMinutes();
            let c = s.getSeconds() - a.getSeconds();

            if (c < 0) {
                c += 60;
                o--;
            }
            if (o < 0) {
                o += 60;
                n--;
            }
            if (n < 0) {
                n += 24;
                l--;
            }
            if (l < 0) {
                const daysInMonth = new Date(s.getFullYear(), s.getMonth(), 0).getDate();
                l += daysInMonth;
                i--;
            }
            if (i < 0) {
                i += 12;
                r--;
            }

            return { years: r, months: i, days: l, hours: n, minutes: o, seconds: c };
        }

        // Verifique se photoUrls existe e é um array
        const photoUrls = coupleData.files || [];
        const youtubeVideo = coupleData.youtubeVideo || null; // Adiciona o campo youtubeVideo


        
        // Gerar HTML para a página do casal
        const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<link rel="icon" href="data:image/svg+xml;base64,${Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>').toString('base64')}" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${coupleData.couplename}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

        body {
            font-family: 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #1F1D2C;
            color: white;
            text-align: center;
            padding: 0 20px;
            overflow-y: auto;
        }

        .container {
            max-width: 500px;
            width: 100%;
            border-radius: 15px;
            padding: 20px;
            margin: 0 auto;
            position: relative;
        }

        .carousel {
        margin-top:80%;
            margin-bottom: 20px;
        }

        .carousel img {
            width: 100%;
            height: auto;
            border-radius: 15px;
        }

        p.date {
            font-size: 0.8em;
            color: #718096;
        }

        .counter {
            color: #fff;
            font-size: 1.2em;
            margin: 20px 0;
        }

        .counter-item {
            display: inline;
            margin: 0 1px;
        }

        .counter-item p {
            margin: 0;
            display: inline;
            font-size: 1em;
        }

        .counter-item span {
            display: inline;
            margin-left: 5px;
        }

        hr.separator {
            margin: 40px auto;
            border: none;
            border-top: 1px solid #ddd;
            width: 50%;
        }

        .message {
            font-size: 1.2em;
            color: #fff;
            text-align: center;
            line-height: 1.5;
        }

        .heart {
            position: absolute;
            top: -50px;
            font-size: 24px;
            color: #FF4B4B;
            animation: fall 5s ease-out;
        }

        @keyframes fall {
            0% {
                transform: translateY(-100px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(calc(100vh + 100px)) scale(1);
                opacity: 0;
            }
        }

        .heart:nth-child(1) { left: 10%; animation-duration: 6s; }
        .heart:nth-child(2) { left: 30%; animation-duration: 8s; }
        .heart:nth-child(3) { left: 50%; animation-duration: 7s; }
        .heart:nth-child(4) { left: 70%; animation-duration: 9s; }
        .heart:nth-child(5) { left: 90%; animation-duration: 5s; }

        .fixed-heart {
            bottom: 20px;
            font-size: 20px;
            color: #FF4B4B;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="carousel">
            ${photoUrls.map((url, index) => `<div><img src="${url}" alt="Imagem ${index + 1}"></div>`).join('')}
        </div>
       
        <p class="date">Juntos: </p>

        <div class="counter">
            <span class="counter-item"><p id="years">0</p><span>anos</span></span>,
            <span class="counter-item"><p id="months">0</p><span>meses</span></span>,
            <span class="counter-item"><p id="days">0</p><span>dias</span></span>
        </div>

        <div class="counter">
            <span class="counter-item"><p id="hours">0</p><span>horas</span></span>,
            <span class="counter-item"><p id="minutes">0</p><span>minutos</span></span>,
            <span class="counter-item"><p id="seconds">0</p><span>segundos</span></span>
        </div>

        <div class="fixed-heart">
            <i class="fas fa-heart "></i>
        </div>

        <hr class="separator">

        <div class="message">
            <p>${coupleData.message}</p>
        </div>
    </div>

    <i class="fas fa-heart heart"></i>
    <i class="fas fa-heart heart"></i>
    <i class="fas fa-heart heart"></i>
    <i class="fas fa-heart heart"></i>
    <i class="fas fa-heart heart"></i>

     <!-- Adicionar iframe oculto para reprodução automática do vídeo do YouTube -->
    ${youtubeVideo ? `<iframe width="0" height="0" src="https://www.youtube.com/embed/${youtubeVideo.split('v=')[1]}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : ''}


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
    <script>
        $(document).ready(function(){
            $('.carousel').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                dots: true
            });
        });

        const relationshipDate = new Date('${coupleData.relationshipDate}');

        function calculateTimeDifference(startDate, endDate) {
            const a = startDate;
            const s = endDate;

            let r = s.getFullYear() - a.getFullYear();
            let i = s.getMonth() - a.getMonth();
            let l = s.getDate() - a.getDate();
            let n = s.getHours() - a.getHours();
            let o = s.getMinutes() - a.getMinutes();
            let c = s.getSeconds() - a.getSeconds();

            if (c < 0) {
                c += 60;
                o--;
            }
            if (o < 0) {
                o += 60;
                n--;
            }
            if (n < 0) {
                n += 24;
                l--;
            }
            if (l < 0) {
                const daysInMonth = new Date(s.getFullYear(), s.getMonth(), 0).getDate();
                l += daysInMonth;
                i--;
            }
            if (i < 0) {
                i += 12;
                r--;
            }

            return { years: r, months: i, days: l, hours: n, minutes: o, seconds: c };
        }

        function updateCounter() {
            const now = new Date();
            const diff = calculateTimeDifference(relationshipDate, now);

            document.getElementById('years').textContent = diff.years;
            document.getElementById('months').textContent = diff.months;
            document.getElementById('days').textContent = diff.days;
            document.getElementById('hours').textContent = diff.hours;
            document.getElementById('minutes').textContent = diff.minutes;
            document.getElementById('seconds').textContent = diff.seconds;
        }

        setInterval(updateCounter, 1000);
        updateCounter();
    </script>
</body>
</html>

        `;

        res.send(html);
    } catch (error) {
        console.error('Erro ao buscar dados do casal:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});





app.get('/success', async (req, res) => {
    const sessionId = req.query.session_id;
    const coupleId = req.query.coupleId;

    if (typeof coupleId !== 'string') {
        return res.status(400).json({ error: 'ID do casal inválido' });
    }

    console.log('sessionId:', sessionId);
    console.log('coupleId:', coupleId);

    try {
        // Recupere a sessão do Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Gerar URL da página do casal
        const siteUrl = `http://192.168.10.4:8080/couple/${coupleId}`;

        // Gerar QR Code com a URL do casal
        const qrCodeDataUrl = await QRCode.toDataURL(siteUrl);

        // Codificar o favicon em base64
        const faviconBase64 = Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `).toString('base64');

        // Gerar HTML para exibir o QR Code com a mensagem e o botão de copiar URL
        const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pagamento Concluído ❤️</title>
            <link rel="icon" href="data:image/svg+xml;base64,${faviconBase64}" type="image/x-icon">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    max-width: 600px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .message {
                    font-size: 1.2em;
                    color: #333;
                    margin-bottom: 20px;
                }
                .qr-code {
                    max-width: 100%;
                    height: auto;
                }
                .copy-button {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 1em;
                    color: #fff;
                    background-color: #28a745;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .copy-button:hover {
                    background-color: #218838;
                }
                .status-message {
                    margin-top: 20px;
                    font-size: 1em;
                    font-weight: bold;
                    padding: 10px;
                    border-radius: 5px;
                }
                .status-message.success {
                    color: #28a745;
                    background-color: #e9f5e9;
                }
                .status-message.error {
                    color: #f44336;
                    background-color: #fce8e8;
                }
                .sub-message {
                    font-size: 1em;
                    color: #555;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p class="message">Seu pagamento foi concluído com sucesso! Use o QR Code abaixo para acessar sua página:</p>
                <img src="${qrCodeDataUrl}" alt="QR Code" class="qr-code">
                
                <!-- Botão para copiar a URL do QR Code -->
                <button class="copy-button" onclick="copyQRCodeUrl()">Copiar URL do QR Code</button>
                
                <!-- Mensagem de status -->
                <div id="statusMessage" class="status-message"></div>

                <!-- Submensagem -->
                <p class="sub-message">Lembre-se de guardar o link para não perder o acesso.</p>

                <!-- Script para copiar a URL do QR Code e mostrar mensagem de status -->
                <script>
                    function copyQRCodeUrl() {
                        const url = "${siteUrl}";
                        navigator.clipboard.writeText(url).then(function() {
                            showStatusMessage('URL copiada para a área de transferência!', 'success');
                        }, function() {
                            showStatusMessage('Falha ao copiar a URL. Por favor, tente novamente.', 'error');
                        });
                    }

                    function showStatusMessage(message, type) {
                        const statusMessage = document.getElementById('statusMessage');
                        statusMessage.textContent = message;
                        statusMessage.className = 'status-message ' + type;
                    }
                </script>
            </div>
        </body>
        </html>
        `;

        res.send(html);
    } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});




// Endpoint para página de cancelamento
app.get('/cancel', (req, res) => {
    res.send('Pagamento cancelado');
});

// Iniciar o servidor na porta 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
