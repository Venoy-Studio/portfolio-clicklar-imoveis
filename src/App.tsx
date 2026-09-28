import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
} from 'framer-motion';

// --- Assets ---
const clipCasa = '/assets/clip-casa-BNzX2mpf.mp4';
const clipSobrado = '/assets/clip-sobrado-DDLG31EQ.mp4';
const clipConquista = '/assets/clip-conquista-z1lD8vZR.mp4';
const clipDecorado = '/assets/clip-decorado-DEKtikz8.mp4';
const posterDecorado = '/assets/clip-decorado-poster-CzEKcBy3.webp';
const jasmimPraca = '/assets/jasmim-praca-AAV2MKbt.webp';
const decoradoSala = '/assets/decorado-sala-IMTE0gJz.webp';
const decoradoJantar = '/assets/decorado-jantar-D3A2JjHx.webp';
const decoradoQuarto = '/assets/decorado-quarto-CAk6Vc2f.webp';
const decoradoKids = '/assets/decorado-kids-BwzXcDky.webp';
const chaves = '/assets/chaves-ycvZ1tXg.webp';
const familia = '/assets/familia-CBPrlQor.webp';
const casaPalmeira = '/assets/casa-palmeira-DOv95gUO.webp';
const conquistaPiscina = '/assets/conquista-piscina-BiR6bGj9.webp';
const casaCapa = '/assets/casa-capa-SOUkK3C9.webp';

const logoIconeDourado = '/assets/logo-icone-dourado-CS9LCesf.png';
const logoWordmarkNavy = '/assets/logo-wordmark-navy-LSqsat37.png';
const logoWordmarkBranco = '/assets/logo-wordmark-branco-B9HbtVWy.png';
const logoLockupBranco = '/assets/logo-lockup-branco-ZOP4cXId.png';

// --- Contatos Fictícios (Conforme Solicitado) ---
const TELEFONE_WHATSAPP = '5585999990000';
const MENSAGEM_PADRAO = 'Olá! Vim pelo site da Click Lar e quero uma simulação sem compromisso.';
const INSTAGRAM_URL = 'https://www.instagram.com/clicklarimoveis';
const CRECI = 'CRECI/CE 00000-J';

const linkWhatsApp = (msg = MENSAGEM_PADRAO) =>
  `https://wa.me/${TELEFONE_WHATSAPP}?text=${encodeURIComponent(msg)}`;

// --- Dados do Site ---
const NAV_LINKS = [
  { rotulo: 'Imóveis', href: '#imoveis' },
  { rotulo: 'Como funciona', href: '#como-funciona' },
  { rotulo: 'Sonho realizado', href: '#sonho-realizado' },
  { rotulo: 'Onde', href: '#onde' },
];

const TICKER_ITEMS = [
  'Casas prontas',
  'Apartamentos novos',
  'Minha Casa Minha Vida',
  'Entrada facilitada',
  'Fortaleza e Região Metropolitana',
  'Corretores com CRECI',
  'Simulação sem compromisso',
];

const DIFERENCIAIS = [
  {
    icone: 'moeda',
    numero: 'R$ 1 mil',
    legenda: 'sinal a partir de*',
    titulo: 'Entrada que cabe no bolso',
    texto:
      'Em empreendimentos parceiros, o sinal começa em R$ 1 mil. O aluguel deste mês podia ser a sua entrada.',
  },
  {
    icone: 'presente',
    numero: 'R$ 55 mil',
    legenda: 'subsídio de até*',
    titulo: 'Subsídio do Minha Casa Minha Vida',
    texto:
      'Parte do valor do imóvel pode ser paga pelo programa. A gente calcula quanto você tem direito.',
  },
  {
    icone: 'celular',
    numero: 'R$ 499',
    legenda: 'parcelas a partir de*',
    titulo: 'Renda de aplicativo conta',
    texto:
      'A Caixa agora aceita a renda de motoristas de app e entregadores como renda formal.',
  },
  {
    icone: 'chave',
    numero: '4,4 mil',
    legenda: 'pessoas acompanham no Instagram',
    titulo: 'Do primeiro oi até as chaves',
    texto: `Corretores registrados (${CRECI}) cuidam da simulação, dos documentos e da assinatura com você.`,
  },
];

const IMOVEIS = [
  {
    id: 'casa-itaitinga',
    tipo: 'Casa pronta',
    nome: 'Casa em Itaitinga',
    local: 'Região do Ancuri, a 10 min de Messejana',
    preco: 'R$ 275 mil',
    precoNota: 'valor anunciado',
    detalhes: ['3 quartos', '2 banheiros', 'Deck', 'Lavanderia', 'Vaga para 2 carros'],
    video: clipCasa,
    poster: casaCapa,
  },
  {
    id: 'sobrado-itaitinga',
    tipo: 'Sobrado pronto',
    nome: 'Sobrado em Itaitinga',
    local: 'Região do Ancuri, a 10 min de Messejana',
    preco: 'R$ 330 mil',
    precoNota: 'valor anunciado',
    detalhes: ['3 quartos', 'Corredor lateral', 'Quintal', 'Vaga para até 2 carros'],
    video: clipSobrado,
    poster: casaPalmeira,
  },
  {
    id: 'conquista-messejana',
    tipo: 'Apartamento',
    nome: 'Conquista Messejana',
    local: 'Messejana, Fortaleza',
    preco: 'Consulte',
    precoNota: 'condições com o corretor',
    detalhes: ['2 quartos', 'Área de lazer completa', 'Futzone', 'Minha Casa Minha Vida'],
    video: clipConquista,
    poster: conquistaPiscina,
  },
  {
    id: 'vitoria-jasmim',
    tipo: 'Apartamento',
    nome: 'Vitória Jasmim',
    local: 'Messejana, próximo ao Pátio',
    preco: 'Consulte',
    precoNota: 'condições com o corretor',
    detalhes: [
      'Lazer completo',
      'Fitness externo',
      'Churrasqueira',
      'Jardim privativo',
      'Pet place',
      'Playground',
    ],
    foto: jasmimPraca,
  },
];

const MAIS_IMOVEIS = [
  {
    nome: 'Mirante Messejana',
    texto: 'Apartamentos no centro de Messejana com entrada de R$ 1 mil.',
  },
  {
    nome: 'Passaré',
    texto:
      '2 quartos e mais de 20 áreas de lazer. Parcelas a partir de R$ 499 e subsídio de até R$ 55 mil.',
  },
];

const DECORADO = {
  video: clipDecorado,
  poster: posterDecorado,
  fotos: [
    { src: decoradoSala, alt: 'Sala de estar do apartamento decorado', legenda: 'Sala' },
    { src: decoradoJantar, alt: 'Mesa de jantar posta no apartamento decorado', legenda: 'Jantar' },
    { src: decoradoQuarto, alt: 'Quarto do casal do apartamento decorado', legenda: 'Quarto' },
    { src: decoradoKids, alt: 'Quarto das crianças com beliche', legenda: 'Quarto das crianças' },
  ],
  citacao:
    'Daqui a alguns anos, você não vai pensar em quanto custou, mas sim em como é bom estar em casa.',
};

const PASSOS = [
  {
    titulo: 'Você chama no WhatsApp',
    texto: 'Conta sua renda, quantas pessoas moram com você e a região que prefere.',
  },
  {
    titulo: 'Simulação sem compromisso',
    texto: 'Um corretor calcula entrada, subsídio e parcela. Você vê os números antes de decidir.',
  },
  {
    titulo: 'Visita ao imóvel',
    texto: 'Casa pronta ou apartamento decorado. Você entra, olha e sente se é o seu lugar.',
  },
  {
    titulo: 'Assinatura e chaves',
    texto: 'A gente acompanha documentação e assinatura até o dia de abrir a porta.',
  },
];

const SONHO = {
  fotos: [
    { src: chaves, alt: 'Casal recebendo as chaves da casa nova' },
    { src: familia, alt: 'Família em frente à casa nova' },
    { src: casaPalmeira, alt: 'Fachada de casa nova com palmeira' },
  ],
  pontos: [
    'Você sabe cada número antes de assinar.',
    'Resposta rápida no WhatsApp, sem enrolação.',
    'Acompanhamento até a entrega das chaves.',
  ],
};

const REGIOES = [
  'Messejana',
  'Passaré',
  'Itaitinga',
  'Ancuri',
  'Fortaleza',
  'Região Metropolitana',
];

const SIMULACAO = {
  foto: conquistaPiscina,
  rendas: [
    'Até R$ 2.500',
    'De R$ 2.500 a R$ 4.000',
    'De R$ 4.000 a R$ 6.000',
    'Acima de R$ 6.000',
  ],
  tipos: ['Casa pronta', 'Apartamento', 'Ainda não sei'],
};

// --- Ícones SVG ---
const svgProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

const IconSeta = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IconPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconCheckCirculo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

const IconPlay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

const IconMoeda = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.6 0-2.6.8-2.6 1.9 0 2.6 5.4 1.2 5.4 4 0 1.2-1.1 2.1-2.8 2.1-1.3 0-2.3-.5-2.9-1.4M12 6.5V8M12 16v1.5" />
  </svg>
);

const IconPresente = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-2-3-5-3-5-1s3 1 5 1ZM12 7c2-3 5-3 5-1s-3 1-5 1Z" />
  </svg>
);

const IconCelular = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
);

const IconChave = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <circle cx="8" cy="14" r="4.5" />
    <path d="m11.5 10.5 8.5-8.5M17 5l2.5 2.5M14 8l2.5 2.5" />
  </svg>
);

const IconPredio = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 10h4a1 1 0 0 1 1 1v10M3 21h18M8 8h3M8 12h3M8 16h3" />
  </svg>
);

const IconCasa = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="m3 11 9-8 9 8M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5M10 21v-6h4v6" />
  </svg>
);

const IconFechar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const IconWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...svgProps} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" />
  </svg>
);

const ICONS_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  moeda: IconMoeda,
  presente: IconPresente,
  celular: IconCelular,
  chave: IconChave,
  predio: IconPredio,
  casa: IconCasa,
};

// --- Animações & Helpers ---
const EASE_CURVE = [0.2, 0.8, 0.2, 1] as const;

interface FadeInProps {
  children: React.ReactNode;
  atraso?: number;
  y?: number;
  className?: string;
  as?: keyof typeof motion;
  [key: string]: any;
}

function FadeIn({
  children,
  atraso = 0,
  y = 24,
  className,
  as = 'div',
  ...rest
}: FadeInProps) {
  const reduzido = useReducedMotion();
  const MotionComp = motion[as as 'div'] || motion.div;

  return (
    <MotionComp
      className={className}
      initial={!reduzido && { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: atraso, ease: EASE_CURVE }}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}

const variantsStaggerContainer = {
  oculto: {},
  visivel: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const variantsStaggerItem = {
  oculto: { opacity: 0, y: 22 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_CURVE },
  },
};

function StaggerContainer({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const reduzido = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduzido ? 'visivel' : 'oculto'}
      whileInView="visivel"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={variantsStaggerContainer}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className,
  as = 'div',
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
  [key: string]: any;
}) {
  const MotionComp = motion[as as 'div'] || motion.div;
  return (
    <MotionComp className={className} variants={variantsStaggerItem} {...rest}>
      {children}
    </MotionComp>
  );
}

// --- Logo Component ---
function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <a href="#topo" className="logo" aria-label="Click Lar Imóveis, voltar ao topo">
      <img src={logoIconeDourado} alt="" />
      {claro ? (
        <img className="wordmark" src={logoWordmarkBranco} alt="Click Lar Imóveis" />
      ) : (
        <>
          <img
            className="wordmark wordmark-escuro"
            src={logoWordmarkNavy}
            alt="Click Lar Imóveis"
          />
          <img className="wordmark wordmark-claro" src={logoWordmarkBranco} alt="" />
        </>
      )}
    </a>
  );
}

// --- Header / Nav ---
function Header() {
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const reduzido = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setRolado(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAberto]);

  return (
    <>
      <motion.header
        className={`nav${rolado ? ' rolado' : ''}`}
        initial={!reduzido && { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_CURVE, delay: 0.1 }}
      >
        <div className="container nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Seções do site">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.rotulo}
              </a>
            ))}
          </nav>
          <a className="btn btn-primario nav-cta" href="#contato">
            Falar com um corretor{' '}
            <span className="seta">
              <IconSeta />
            </span>
          </a>
          <button
            className="nav-menu"
            aria-label="Abrir menu"
            onClick={() => setMenuAberto(true)}
          >
            <IconMenu />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            className="menu-movel"
            initial={{ opacity: 0, y: reduzido ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduzido ? 0 : -12 }}
            transition={{ duration: 0.3, ease: EASE_CURVE }}
          >
            <div className="topo">
              <Logo claro />
              <button
                className="nav-menu"
                style={{ borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}
                aria-label="Fechar menu"
                onClick={() => setMenuAberto(false)}
              >
                <IconFechar />
              </button>
            </div>
            <nav aria-label="Seções do site">
              {NAV_LINKS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  initial={!reduzido && { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.4, ease: EASE_CURVE }}
                >
                  {item.rotulo}
                </motion.a>
              ))}
            </nav>
            <div className="rodape">
              <a
                className="btn btn-dourado"
                href="#contato"
                onClick={() => setMenuAberto(false)}
              >
                Falar com um corretor{' '}
                <span className="seta">
                  <IconSeta />
                </span>
              </a>
              <a
                className="btn btn-fantasma"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}
                href={linkWhatsApp()}
                target="_blank"
                rel="noreferrer"
              >
                <IconWhatsApp /> WhatsApp
              </a>
              <a
                className="btn btn-fantasma"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <IconInstagram /> @clicklarimoveis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Canvas Scrub Hero Component ---
const TOTAL_FRAMES = 231;
const HERO_SCROLL_VH = 400;
const HERO_DIRS = {
  desk: { pasta: '/hero/desk' },
  mob: { pasta: '/hero/mob' },
};
const ASPECT_RATIO_TOLERANCE = 0.08;
const BG_FILL_COLOR = '#07090c';
const FINAL_FRAME_INDEX = 230;
const STRIDE_STEPS = 8;
const CONCURRENT_DOWNLOADS = 6;
const DAMPING_FACTOR = 70;

const getFrameUrl = (device: 'desk' | 'mob', frameIdx: number) =>
  `${HERO_DIRS[device].pasta}/${String(frameIdx + 1).padStart(4, '0')}.webp`;

const getDeviceType = (w: number, h: number): 'desk' | 'mob' =>
  h > w && w < 820 ? 'mob' : 'desk';

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

function createFramePreloader(
  device: 'desk' | 'mob',
  onProgress: (loadedIndex: number, totalLoaded: number) => void
) {
  const images = Array<HTMLImageElement>(TOTAL_FRAMES);
  const ready = new Uint8Array(TOTAL_FRAMES);
  const requested = new Uint8Array(TOTAL_FRAMES);
  let active = true;
  let activeDownloads = 0;
  let totalLoaded = 0;
  const queue: number[] = [];
  const queuedSet = new Set<number>();

  const enqueue = (idx: number) => {
    if (!queuedSet.has(idx)) {
      queuedSet.add(idx);
      queue.push(idx);
    }
  };

  enqueue(0);
  enqueue(FINAL_FRAME_INDEX);

  for (const stride of [STRIDE_STEPS, 4, 2, 1]) {
    for (let i = 0; i < TOTAL_FRAMES; i += stride) {
      enqueue(i);
    }
  }

  const loadFrame = (idx: number) => {
    requested[idx] = 1;
    activeDownloads++;
    const img = new Image();
    img.decoding = 'async';
    images[idx] = img;

    const done = () => {
      activeDownloads--;
      if (active) pump();
    };

    img.onload = () => {
      if (active) {
        ready[idx] = 1;
        totalLoaded++;
        onProgress(idx, totalLoaded);
        done();
      }
    };
    img.onerror = done;
    img.src = getFrameUrl(device, idx);
  };

  const pump = () => {
    while (activeDownloads < CONCURRENT_DOWNLOADS && queue.length) {
      const idx = queue.shift()!;
      if (!requested[idx]) {
        loadFrame(idx);
      }
    }
  };

  pump();

  return {
    imgs: images,
    pronto: ready,
    priorizar: (targetIdx: number, direction: number) => {
      const priorityRange: number[] = [];
      const start = direction >= 0 ? targetIdx - 2 : targetIdx - 14;
      const end = direction >= 0 ? targetIdx + 14 : targetIdx + 2;

      for (let i = clamp(start, 0, FINAL_FRAME_INDEX); i <= clamp(end, 0, FINAL_FRAME_INDEX); i++) {
        if (!requested[i]) priorityRange.push(i);
      }
      if (!priorityRange.length) return;
      const remaining = queue.filter((i) => !priorityRange.includes(i));
      queue.length = 0;
      queue.push(...priorityRange, ...remaining);
      pump();
    },
    parar: () => {
      active = false;
    },
  };
}

function HeroRolagem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduzido = useReducedMotion();
  const progressoMotion = useMotionValue(0);

  const [device, setDevice] = useState<'desk' | 'mob'>(() =>
    getDeviceType(
      typeof window !== 'undefined' ? window.innerWidth : 1200,
      typeof window !== 'undefined' ? window.innerHeight : 800
    )
  );
  const [loadRatio, setLoadRatio] = useState(0);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let width = 0;
    let height = 0;
    let dpr = 1;
    let targetProgress = 0;
    let currentProgress = 0;
    let currentFrame = -1;
    let lastPushedFrame = -1;
    let animId = 0;
    let lastTime = 0;
    const keyframeThreshold = Math.ceil(TOTAL_FRAMES / STRIDE_STEPS) + 2;
    let hasLoadedKeyframes = false;

    const preloader = createFramePreloader(device, (loadedIdx, count) => {
      if (count <= keyframeThreshold) {
        setLoadRatio(count / keyframeThreshold);
      }
      if (!hasLoadedKeyframes && count >= keyframeThreshold) {
        hasLoadedKeyframes = true;
        setCarregado(true);
      }
      const desiredIdx = reduzido ? FINAL_FRAME_INDEX : Math.round(currentProgress * 230);
      if (loadedIdx === desiredIdx || currentFrame === -1) {
        solicitarRender();
      }
    });

    const { imgs, pronto } = preloader;

    const findClosestAvailableFrame = (idx: number) => {
      if (pronto[idx]) return idx;
      for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
        if (idx - delta >= 0 && pronto[idx - delta]) return idx - delta;
        if (idx + delta < TOTAL_FRAMES && pronto[idx + delta]) return idx + delta;
      }
      return -1;
    };

    const drawFrame = (idx: number) => {
      const img = imgs[idx];
      if (!img || !pronto[idx] || !width || !height) return false;

      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;
      const canvasRatio = width / height;

      if (Math.abs(canvasRatio - imgRatio) / imgRatio <= ASPECT_RATIO_TOLERANCE) {
        ctx.drawImage(img, 0, 0, width, height);
      } else {
        const scale = Math.min(width / imgW, height / imgH);
        const drawnW = imgW * scale;
        const drawnH = imgH * scale;
        ctx.fillStyle = BG_FILL_COLOR;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, (width - drawnW) / 2, (height - drawnH) / 2, drawnW, drawnH);
      }
      currentFrame = idx;
      canvas.dataset.quadro = String(idx + 1);
      return true;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const rectW = Math.round(rect.width);
      const rectH = Math.round(rect.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (!rectW || !rectH) return;

      const currentDevice = getDeviceType(window.innerWidth, window.innerHeight);
      if (currentDevice !== device) {
        setDevice(currentDevice);
        return;
      }

      if (rectW === width && rectH === height && pixelRatio === dpr) return;

      width = rectW;
      height = rectH;
      dpr = pixelRatio;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      const prevFrame = currentFrame;
      currentFrame = -1;
      if (prevFrame >= 0) {
        drawFrame(prevFrame);
      } else {
        solicitarRender();
      }
    };

    const updateScrollProgress = () => {
      if (!containerRef.current || !stickyRef.current) return;
      const contRect = containerRef.current.getBoundingClientRect();
      const stickH = stickyRef.current.getBoundingClientRect().height || height;
      const travel = contRect.height - stickH;

      targetProgress = travel > 0 ? clamp(-contRect.top / travel, 0, 1) : 0;
      progressoMotion.set(targetProgress);

      document.documentElement.dataset.hero =
        contRect.bottom > stickH * 0.5 && contRect.top < stickH ? '1' : '0';
    };

    const tick = (now: number) => {
      animId = 0;
      const delta = lastTime ? Math.min(64, now - lastTime) : 16;
      lastTime = now;

      if (reduzido) {
        currentProgress = FINAL_FRAME_INDEX / 230;
      } else {
        const factor = 1 - Math.exp(-delta / DAMPING_FACTOR);
        currentProgress += (targetProgress - currentProgress) * factor;
        if (Math.abs(targetProgress - currentProgress) < 4e-4) {
          currentProgress = targetProgress;
        }
      }

      const frameIdx = Math.round(currentProgress * 230);
      const closest = findClosestAvailableFrame(frameIdx);

      if (closest >= 0 && closest !== currentFrame) {
        drawFrame(closest);
      }

      if (Math.abs(frameIdx - lastPushedFrame) >= 3) {
        lastPushedFrame = frameIdx;
        preloader.priorizar(frameIdx, targetProgress >= currentProgress ? 1 : -1);
      }

      if (currentProgress === targetProgress) {
        lastTime = 0;
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    const solicitarRender = () => {
      animId ||= requestAnimationFrame(tick);
    };

    const onScrollOrResize = () => {
      updateScrollProgress();
      solicitarRender();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      updateScrollProgress();
      solicitarRender();
    });

    resizeObserver.observe(canvas);
    resize();
    updateScrollProgress();
    solicitarRender();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('orientationchange', resize);

    return () => {
      preloader.parar();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('orientationchange', resize);
      if (animId) cancelAnimationFrame(animId);
      delete document.documentElement.dataset.hero;
    };
  }, [device, reduzido, progressoMotion]);

  return (
    <section
      className="hero-rolagem"
      id="topo"
      ref={containerRef}
      style={{ height: reduzido ? '100vh' : `${HERO_SCROLL_VH}vh` }}
      aria-label="A casa nascendo do projeto até as chaves"
    >
      <div className="hero-sticky" ref={stickyRef}>
        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="hero-veu" aria-hidden="true" />
        <HeroConteudo progresso={progressoMotion} reduzido={!!reduzido} />
        {!carregado && !reduzido && (
          <div className="hero-carga" aria-hidden="true">
            <span style={{ transform: `scaleX(${loadRatio})` }} />
          </div>
        )}
      </div>
    </section>
  );
}

// --- Overlay flutuante de conteúdo no Hero ---
function HeroConteudo({
  progresso,
  reduzido,
}: {
  progresso: any;
  reduzido: boolean;
}) {
  const aberturaOpacity = useTransform(progresso, [0, 0.1], [1, 0]);
  const aberturaY = useTransform(progresso, [0, 0.1], [0, -16]);
  const finalOpacity = useTransform(progresso, [0.78, 0.92], [0, 1]);
  const finalY = useTransform(progresso, [0.78, 0.92], [28, 0]);
  const veuFinalOpacity = useTransform(progresso, [0.7, 0.92], [0, 1]);

  return (
    <div className="hero-conteudo">
      <motion.div
        className="hero-veu-final"
        style={reduzido ? { opacity: 1 } : { opacity: veuFinalOpacity }}
        aria-hidden="true"
      />

      {!reduzido && (
        <motion.div
          className="hero-abertura"
          style={{ opacity: aberturaOpacity, y: aberturaY }}
        >
          <span className="hero-mouse">
            <i />
          </span>
          <span>Role para ver a casa nascer</span>
        </motion.div>
      )}

      <motion.div
        className="hero-final"
        style={reduzido ? { opacity: 1, y: 0 } : { opacity: finalOpacity, y: finalY }}
      >
        <span className="rotulo">{CRECI} · Fortaleza e Região Metropolitana</span>
        <h1>
          Sua casa própria
          <br />
          a um clique.
        </h1>
        <p className="lead">
          Casas prontas e apartamentos novos, com entrada facilitada e subsídio do
          Minha Casa Minha Vida. Um corretor cuida de tudo até o dia das chaves.
        </p>
        <div className="hero-acoes">
          <motion.a
            className="btn btn-dourado"
            href="#contato"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero minha simulação grátis{' '}
            <span className="seta">
              <IconSeta />
            </span>
          </motion.a>
          <motion.a
            className="btn btn-claro"
            href="#imoveis"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver imóveis
          </motion.a>
        </div>
        <div className="hero-confianca">
          <span>
            <IconCheckCirculo /> Resposta rápida no WhatsApp
          </span>
          <span>
            <IconCheckCirculo /> Sem compromisso
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// --- Faixa Marquee ---
function FaixaMarquee() {
  const reduzido = useReducedMotion();
  const itensDuplicados = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="faixa" aria-hidden="true">
      <motion.div
        className="faixa-trilho"
        animate={reduzido ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
      >
        {itensDuplicados.map((item, idx) => (
          <span key={idx} className="faixa-item">
            <i />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// --- Seção: Por que a Click Lar ---
function SecaoPorQue() {
  return (
    <section className="secao" id="por-que">
      <div className="container">
        <div className="secao-cabeca">
          <FadeIn>
            <span className="rotulo">Por que a Click Lar</span>
            <h2 style={{ marginTop: 14 }}>O aluguel deste mês podia ser a sua entrada.</h2>
          </FadeIn>
          <FadeIn atraso={0.1} className="lead">
            A gente mostra os números antes de qualquer decisão. Entrada, subsídio e parcela,
            explicados em uma conversa.
          </FadeIn>
        </div>

        <StaggerContainer className="cartoes">
          {DIFERENCIAIS.map((item) => {
            const Icone = ICONS_MAP[item.icone] || IconMoeda;
            return (
              <StaggerItem key={item.titulo} className="cartao">
                <span className="icone">
                  <Icone />
                </span>
                <div className="numero">
                  {item.numero}
                  <small>{item.legenda}</small>
                </div>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn className="nota" y={8}>
          *Condições de empreendimentos parceiros anunciadas pela Click Lar, sujeitas a
          análise de crédito e disponibilidade.
        </FadeIn>
      </div>
    </section>
  );
}

// --- Card de Imóvel com Hover-Video ---
function CardImovel({ imovel }: { imovel: (typeof IMOVEIS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const reduzido = useReducedMotion();
  const temVideo = !!imovel.video;

  const playVideo = () => {
    if (temVideo && !reduzido && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setTocando(true))
        .catch(() => {});
    }
  };

  const pauseVideo = () => {
    if (temVideo && videoRef.current) {
      videoRef.current.pause();
      setTocando(false);
    }
  };

  return (
    <StaggerItem className="imovel" as="article">
      <motion.div
        className="imovel-midia"
        onHoverStart={playVideo}
        onHoverEnd={pauseVideo}
        onClick={() => (tocando ? pauseVideo() : playVideo())}
      >
        <motion.img
          src={imovel.poster || (imovel as any).foto}
          alt={`${imovel.nome}, ${imovel.local}`}
          loading="lazy"
          animate={{ scale: tocando ? 1.04 : 1 }}
          transition={{ duration: 0.8, ease: EASE_CURVE }}
        />
        {temVideo && (
          <motion.video
            ref={videoRef}
            src={imovel.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            animate={{ opacity: +tocando }}
            transition={{ duration: 0.4 }}
          />
        )}
        <span className="imovel-tag">{imovel.tipo}</span>
        {temVideo && (
          <span className="imovel-play" aria-hidden="true">
            {tocando ? (
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: '#fff',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
            ) : (
              <IconPlay />
            )}
          </span>
        )}
      </motion.div>

      <div className="imovel-corpo">
        <h3>{imovel.nome}</h3>
        <span className="local">
          <IconPin /> {imovel.local}
        </span>
        <div className="imovel-detalhes">
          {imovel.detalhes.map((det) => (
            <span key={det}>{det}</span>
          ))}
        </div>
        <div className="imovel-pe">
          <div className="preco">
            {imovel.preco}
            <small>{imovel.precoNota}</small>
          </div>
          <a
            className="btn btn-primario"
            href={linkWhatsApp(`Olá! Quero saber mais sobre ${imovel.nome} (${imovel.local}).`)}
            target="_blank"
            rel="noreferrer"
          >
            Tenho interesse{' '}
            <span className="seta">
              <IconSeta />
            </span>
          </a>
        </div>
      </div>
    </StaggerItem>
  );
}

// --- Seção: Imóveis em Destaque ---
function SecaoImoveis() {
  return (
    <section className="secao" id="imoveis" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="secao-cabeca">
          <FadeIn>
            <span className="rotulo">Imóveis em destaque</span>
            <h2 style={{ marginTop: 14 }}>
              Casas prontas para entrar. Apartamentos para começar de novo.
            </h2>
          </FadeIn>
          <FadeIn atraso={0.1} className="lead">
            Passe o mouse para ver o imóvel por dentro. Cada um com o corretor a uma
            mensagem de distância.
          </FadeIn>
        </div>

        <StaggerContainer className="imoveis-grid">
          {IMOVEIS.map((imovel) => (
            <CardImovel key={imovel.id} imovel={imovel} />
          ))}
        </StaggerContainer>

        <StaggerContainer className="mais-imoveis">
          {MAIS_IMOVEIS.map((item) => (
            <StaggerItem
              key={item.nome}
              as="a"
              className="mini"
              href={linkWhatsApp(`Olá! Quero saber mais sobre ${item.nome}.`)}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icone">
                <IconPredio />
              </span>
              <span>
                <h3>{item.nome}</h3>
                <p>{item.texto}</p>
              </span>
              <span className="seta">
                <IconSeta />
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// --- Seção: Por Dentro (Decorado) ---
function SecaoDecorado() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], reduzido ? [0, 0] : [-30, 30]);

  return (
    <section className="secao decorado" id="decorado" ref={containerRef}>
      <div className="container">
        <div className="secao-cabeca">
          <FadeIn>
            <span className="rotulo">Por dentro</span>
            <h2 style={{ marginTop: 14 }}>Imagina chegar em casa assim.</h2>
          </FadeIn>
          <FadeIn atraso={0.1} className="lead">
            Um passeio pelo apartamento decorado que a Click Lar mostra aos clientes. Cada
            cômodo do jeito que você imaginou.
          </FadeIn>
        </div>

        <StaggerContainer className="bento">
          <StaggerItem className="grande">
            <motion.video
              src={DECORADO.video}
              poster={DECORADO.poster}
              muted
              loop
              playsInline
              autoPlay={!reduzido}
              preload="metadata"
              style={{ y: videoY, scale: 1.1 }}
              aria-label="Passeio pelo apartamento decorado"
            />
            <span className="legenda">Apartamento decorado</span>
          </StaggerItem>

          {DECORADO.fotos.slice(0, 2).map((foto) => (
            <StaggerItem key={foto.legenda} className="quad">
              <motion.img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: EASE_CURVE }}
              />
              <span className="legenda">{foto.legenda}</span>
            </StaggerItem>
          ))}

          <StaggerItem className="citacao">
            <p>“{DECORADO.citacao}”</p>
            <small>Do Instagram da Click Lar</small>
          </StaggerItem>

          {DECORADO.fotos.slice(2).map((foto) => (
            <StaggerItem key={foto.legenda} className="quad">
              <motion.img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: EASE_CURVE }}
              />
              <span className="legenda">{foto.legenda}</span>
            </StaggerItem>
          ))}

          <StaggerItem className="convite">
            <h3>Quer conhecer um decorado de perto?</h3>
            <p>
              Marque uma visita pelo WhatsApp. O corretor combina dia e horário com você.
            </p>
            <a
              className="btn btn-claro"
              href={linkWhatsApp('Olá! Quero marcar uma visita a um apartamento decorado.')}
              target="_blank"
              rel="noreferrer"
            >
              Marcar visita{' '}
              <span className="seta">
                <IconSeta />
              </span>
            </a>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

// --- Seção: Como Funciona ---
function SecaoComoFunciona() {
  return (
    <section className="secao" id="como-funciona">
      <div className="container">
        <div className="secao-cabeca">
          <FadeIn>
            <span className="rotulo">Como funciona</span>
            <h2 style={{ marginTop: 14 }}>Quatro passos, sem enrolação.</h2>
          </FadeIn>
          <FadeIn atraso={0.1} className="lead">
            Do primeiro oi até a chave na mão, você sempre sabe o que vem depois.
          </FadeIn>
        </div>

        <StaggerContainer className="passos">
          {PASSOS.map((passo, idx) => (
            <StaggerItem key={passo.titulo} className="passo">
              <span className="num">PASSO 0{idx + 1}</span>
              <h3>{passo.titulo}</h3>
              <p>{passo.texto}</p>
              <span className="barra">
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE_CURVE, delay: 0.2 + idx * 0.15 }}
                />
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// --- Seção: Sonho Realizado ---
function SecaoSonhoRealizado() {
  return (
    <section className="secao" id="sonho-realizado" style={{ paddingTop: 0 }}>
      <div className="container sonho-grid">
        <StaggerContainer className="sonho-fotos">
          {SONHO.fotos.map((foto, idx) => (
            <StaggerItem key={idx}>
              <motion.img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: EASE_CURVE }}
              />
            </StaggerItem>
          ))}
          <StaggerItem
            style={{
              background: 'var(--dourado)',
              display: 'grid',
              placeItems: 'center',
              padding: 20,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--navy)',
              }}
            >
              Sonho
              <br />
              realizado
            </span>
          </StaggerItem>
        </StaggerContainer>

        <div className="sonho-texto">
          <FadeIn>
            <span className="rotulo">Sonho realizado</span>
          </FadeIn>
          <FadeIn atraso={0.05}>
            <h2>Cada chave entregue é um novo capítulo.</h2>
          </FadeIn>
          <FadeIn atraso={0.1} className="lead">
            Famílias de Fortaleza e região que saíram do aluguel com a Click Lar. O
            primeiro contato foi uma mensagem, igual à que você pode mandar agora.
          </FadeIn>
          <FadeIn atraso={0.15} as="ul" className="sonho-lista">
            {SONHO.pontos.map((ponto) => (
              <li key={ponto}>
                <IconCheck /> {ponto}
              </li>
            ))}
          </FadeIn>
          <FadeIn atraso={0.2}>
            <a className="btn btn-primario" href="#contato">
              Quero o meu capítulo{' '}
              <span className="seta">
                <IconSeta />
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// --- Seção: Onde Atuamos ---
function SecaoOnde() {
  return (
    <section className="secao onde" id="onde">
      <div className="container onde-grid">
        <div>
          <FadeIn>
            <span className="rotulo">Onde</span>
          </FadeIn>
          <FadeIn atraso={0.05}>
            <h2 style={{ marginTop: 14 }}>
              Do centro de Messejana à Região Metropolitana.
            </h2>
          </FadeIn>
          <FadeIn atraso={0.1} className="lead" style={{ marginTop: 16 }}>
            Empreendimentos por toda Fortaleza e cidades vizinhas. Você diz a região, a
            gente mostra o que cabe no seu bolso.
          </FadeIn>
        </div>

        <StaggerContainer className="chips">
          {REGIOES.map((regiao, idx) => (
            <StaggerItem
              key={regiao}
              as="span"
              className={`chip${idx === 0 ? ' forte' : ''}`}
            >
              <IconPin /> {regiao}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// --- Seção: Contato e Simulação Grátis ---
function SecaoContato() {
  const [formData, setFormData] = useState({
    nome: '',
    whats: '',
    renda: '',
    tipo: '',
  });
  const [enviado, setEnviado] = useState(false);
  const reduzido = useReducedMotion();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensagem = [
      'Olá! Vim pelo site da Click Lar e quero uma simulação.',
      `Nome: ${formData.nome}`,
      `WhatsApp: ${formData.whats}`,
      formData.renda && `Renda familiar: ${formData.renda}`,
      formData.tipo && `Procuro: ${formData.tipo}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(linkWhatsApp(mensagem), '_blank', 'noopener');
    setEnviado(true);
  };

  return (
    <section className="secao contato" id="contato">
      <div className="container">
        <FadeIn className="contato-caixa" y={32}>
          <span className="brilho" aria-hidden="true" />
          <div className="contato-texto">
            <span className="rotulo">Simulação grátis</span>
            <h2>Descubra quanto fica a sua parcela.</h2>
            <p className="lead">
              Um corretor da Click Lar responde no WhatsApp com entrada, subsídio e
              parcela calculados para a sua renda. Sem compromisso.
            </p>
            <div className="contato-foto">
              <img
                src={SIMULACAO.foto}
                alt="Área de lazer com piscina de empreendimento em Messejana"
                loading="lazy"
              />
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {enviado ? (
                <motion.div
                  key="ok"
                  initial={!reduzido && { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_CURVE }}
                  style={{
                    display: 'grid',
                    gap: 12,
                    textAlign: 'center',
                    padding: '24px 0',
                  }}
                >
                  <IconCheckCirculo
                    style={{
                      width: 48,
                      height: 48,
                      margin: '0 auto',
                      color: 'var(--dourado-2)',
                    }}
                  />
                  <h3>Abrimos o WhatsApp para você</h3>
                  <p className="muted">
                    Se a conversa não abriu, toque no botão abaixo. Um corretor responde em
                    seguida.
                  </p>
                  <a
                    className="btn btn-dourado"
                    href={linkWhatsApp()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconWhatsApp /> Abrir WhatsApp
                  </a>
                  <button
                    type="button"
                    className="btn btn-fantasma"
                    onClick={() => setEnviado(false)}
                  >
                    Enviar outra
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  style={{ display: 'grid', gap: 14 }}
                  exit={{ opacity: 0 }}
                >
                  <label>
                    Seu nome
                    <input
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Como quer ser chamado"
                      required
                      autoComplete="name"
                    />
                  </label>

                  <label>
                    Seu WhatsApp
                    <input
                      name="whats"
                      value={formData.whats}
                      onChange={handleChange}
                      placeholder="(85) 9 0000-0000"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                    />
                  </label>

                  <div className="linha">
                    <label>
                      Renda da família
                      <select
                        name="renda"
                        value={formData.renda}
                        onChange={handleChange}
                      >
                        <option value="">Prefiro contar no chat</option>
                        {SIMULACAO.rendas.map((renda) => (
                          <option key={renda} value={renda}>
                            {renda}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      O que procura
                      <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                      >
                        <option value="">Ainda não sei</option>
                        {SIMULACAO.tipos.map((tipo) => (
                          <option key={tipo} value={tipo}>
                            {tipo}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-dourado"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <IconWhatsApp /> Receber simulação no WhatsApp
                  </motion.button>

                  <small>
                    Você fala direto com um corretor registrado ({CRECI}). Seus dados vão
                    só para essa conversa.
                  </small>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

// --- Rodapé ---
function Rodape() {
  const whatsFormatado = TELEFONE_WHATSAPP.replace(
    /^55(\d{2})(\d{5})(\d{4})$/,
    '($1) $2-$3'
  );

  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-grid">
          <div className="linhas">
            <img src={logoLockupBranco} alt="Click Lar Imóveis" />
            <p>
              Conectando você ao seu novo lar. Empreendimentos por toda Fortaleza e Região
              Metropolitana.
            </p>
            <p>{CRECI}</p>
          </div>

          <div className="linhas">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
            >
              <IconWhatsApp style={{ width: 18, height: 18 }} /> {whatsFormatado}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
            >
              <IconInstagram style={{ width: 18, height: 18 }} /> @clicklarimoveis
            </a>
            <a
              href="#topo"
              style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
            >
              Voltar ao topo{' '}
              <IconSeta style={{ width: 16, height: 16, transform: 'rotate(-90deg)' }} />
            </a>
          </div>
        </div>

        <div className="fim">
          <span>
            © 2026 Click Lar Imóveis. Valores e condições anunciados pela Click Lar e
            parceiros, sujeitos a alteração.
          </span>
          <span>Imagens: registros da Click Lar e material dos empreendimentos.</span>
        </div>
      </div>
    </footer>
  );
}

// --- Botão Flutuante WhatsApp ---
function BotaoFlutuanteWhatsApp() {
  const reduzido = useReducedMotion();

  return (
    <motion.a
      className="flutuante"
      href={linkWhatsApp()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={!reduzido && { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 2.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconWhatsApp /> <span>Falar no WhatsApp</span>
    </motion.a>
  );
}

// --- App Principal ---
export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroRolagem />
        <FaixaMarquee />
        <SecaoPorQue />
        <SecaoImoveis />
        <SecaoDecorado />
        <SecaoComoFunciona />
        <SecaoSonhoRealizado />
        <SecaoOnde />
        <SecaoContato />
      </main>
      <Rodape />
      <BotaoFlutuanteWhatsApp />
    </>
  );
}
