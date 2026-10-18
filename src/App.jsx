import { useEffect, useMemo, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import GlobalStyles from '@mui/material/GlobalStyles';
import MenuRounded from '@mui/icons-material/MenuRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import HomeWorkOutlined from '@mui/icons-material/HomeWorkOutlined';
import HealthAndSafetyOutlined from '@mui/icons-material/HealthAndSafetyOutlined';
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import ApartmentRounded from '@mui/icons-material/ApartmentRounded';
import HandymanOutlined from '@mui/icons-material/HandymanOutlined';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import FamilyRestroomRounded from '@mui/icons-material/FamilyRestroomRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import CheckRounded from '@mui/icons-material/CheckRounded';
import CloseOutlined from '@mui/icons-material/CloseOutlined';

import logoHorizontal from './assets/logo-horizontal.png';
import logoDark from './assets/logo-darkmode.png';
import photoMeJouy from './assets/mejouy.jpg';
import photoJerulyn from './assets/jerulyn.jpg';
import photoSheila from './assets/sheila.jpg';
import photoBatara from './assets/maamro.jpg';
import { BRAND } from './theme';

/* =================================================================== */
/*  SETTINGS                                                            */
/* =================================================================== */

const EMAIL = 'kwartokeeper@gmail.com'; // suggested; create this inbox or change it
const PHONE_DISPLAY = '0953 823 6503';
const PHONE_LINK = 'tel:+639538236503';
const ADDRESS = 'Bayombong, Nueva Vizcaya, Philippines';

const ORANGE = BRAND.orange;
const INK = BRAND.charcoal;
const HEAD = '"Inter", sans-serif';
// One set of corner radii for the whole page
const R = { sm: '10px', md: '14px', lg: '20px', xl: '24px' };

/* =================================================================== */
/*  CONTENT: from the pitch deck and concept note                       */
/* =================================================================== */

const NAV = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Features', 'features'],
  ['Contact', 'contact'],
];

// Deck "Problem" slide, short
const CHALLENGES = [
  'Repairs reported verbally, so dangerous ones wait',
  'Tenant records kept in unlocked folders',
  "Owners can't see who paid or which rooms are empty",
  'Manual billing and lost receipts',
  'Parents pay but see nothing',
];

// Concept note answers, short
const SOLUTIONS = [
  'Repairs ranked by danger, with instant urgent alerts',
  'Encrypted digital tenant records (RA 10173)',
  'One room map and dashboard for the owner',
  'GCash, Maya, bank, or cash with automatic receipts',
  'Consent-based updates for parents',
];

// Deck "Features" slide
const FEATURES = [
  { icon: HomeWorkOutlined, title: 'Property Management', body: 'See every room at a glance: occupied, vacant, or under repair.' },
  { icon: HealthAndSafetyOutlined, title: 'Safety-first Maintenance', body: 'Repairs ranked Urgent, Moderate, or Minor under PD 1096. Urgent ones alert right away.' },
  { icon: PaymentsOutlined, title: 'Payment Management', body: 'Upload proof, tap Approve, and the receipt updates itself.' },
  { icon: InsightsOutlined, title: 'Insights and Transparency', body: 'Locked, timestamped records and one-tap safety, income, and vacancy reports.' },
];

// Deck "Users" slide
const USERS = [
  { icon: ApartmentRounded, name: 'Owner', body: 'Rooms, payments, and alerts in one view.' },
  { icon: HandymanOutlined, name: 'Caretaker', body: 'A task list sorted by urgency.' },
  { icon: PersonOutlineRounded, name: 'Tenant', body: 'Report problems and pay with proof.' },
  { icon: FamilyRestroomRounded, name: 'Parent', body: 'Payments and repairs, with consent.' },
];

const SDGS = [
  ['11', 'Sustainable Cities and Communities', '#F99D26'],
  ['9', 'Industry, Innovation and Infrastructure', '#F36D25'],
  ['8', 'Decent Work and Economic Growth', '#A21942'],
];

const FOOTER_LINKS = [
  ['Product', [['Features', '#features'], ["Who it's for", '#features'], ['Get started', '#contact']]],
  ['Company', [['About', '#about'], ['Team', '#contact'], ['Contact', '#contact']]],
];

const TEAM = [
  ['Me Jouy T. Paspie', 'Team member', photoMeJouy],
  ['Jerulyn Kate A. Sagun', 'Team member', photoJerulyn],
  ['Sheila Mae M. Liwanag', 'Team member', photoSheila],
  ['Rocel Audrey J. Batara, MIT', 'Mentor', photoBatara],
];

/* =================================================================== */
/*  Motion: hero rises in, building windows light up (as in the app)   */
/* =================================================================== */

const AnimationStyles = (
  <GlobalStyles
    styles={{
      '@keyframes kkFadeUp': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'none' } },
      '@keyframes kkPop': { from: { opacity: 0, transform: 'scale(0.6)' }, to: { opacity: 1, transform: 'scale(1)' } },
      '@keyframes kkWindow': { '0%, 100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': { animationDuration: '0.001ms !important', animationIterationCount: '1 !important', transitionDuration: '0.001ms !important' },
      },
    }}
  />
);
const enter = (ms = 0) => ({ animation: `kkFadeUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) ${ms}ms both` });

/* =================================================================== */
/*  The building (shared with the app). Lit window = beds taken.       */
/* =================================================================== */

// Two shapes of the same building: tall for desktop, wide and short for phones.
const LAYOUTS = {
  tall: { rows: 6, cols: 5, lit: [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0] },
  wide: { rows: 3, cols: 8, lit: [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0] },
};
const SIZE = 34;
const GAP = 14;
const LETTERS = 'ABCDEFGH';

const roomInfo = (layout, idx) => {
  const { rows, cols, lit: litList } = LAYOUTS[layout];
  const lit = litList[idx] === 1;
  const name = `Room ${rows - Math.floor(idx / cols)}${LETTERS[idx % cols]}`;
  if (!lit) return { name, lit, line1: 'Vacant', line2: '4 beds open' };
  const taken = [2, 3, 4, 1][idx % 4];
  return { name, lit, line1: `${taken} of 4 beds taken`, line2: idx % 3 === 0 ? 'Rent due in 3 days' : 'Rent paid' };
};

function Building({ layout, selected, onSelect }) {
  const { rows, cols, lit: litList } = LAYOUTS[layout];
  const gridW = cols * (SIZE + GAP) - GAP;
  const gridH = rows * (SIZE + GAP) - GAP;
  const vbW = gridW + 40;
  const lobbyTop = 22 + gridH + 8; // ground floor starts under the last row of windows
  const groundY = lobbyTop + 52;
  const vbH = groundY + 4;
  const doorW = 40;
  const doorH = 36;
  const doorX = vbW / 2 - doorW / 2;
  const doorY = groundY - 3 - doorH;
  const windows = useMemo(() => litList.map((lit, idx) => ({ idx, lit, x: 20 + (idx % cols) * (SIZE + GAP), y: 22 + Math.floor(idx / cols) * (SIZE + GAP) })), [litList, cols]);
  return (
    <Box sx={{ width: '100%', maxWidth: layout === 'tall' ? 260 : 'none', mx: 'auto', '& rect[role="button"]': { cursor: 'pointer', outline: 'none' }, '& rect[role="button"]:focus-visible': { stroke: '#fff', strokeWidth: 2.5 } }}>
      <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" style={{ display: 'block' }} role="group" aria-label="A sample dormitory building. Select a room to see its details.">
        {/* roof and walls */}
        <rect x="0" y="0" width={vbW} height="8" rx="3" fill="rgba(255,255,255,0.2)" />
        <rect x="6" y="8" width={vbW - 12} height={groundY - 8} fill="rgba(255,255,255,0.05)" />
        {/* ground floor band */}
        <rect x="6" y={lobbyTop} width={vbW - 12} height={groundY - lobbyTop} fill="rgba(255,255,255,0.04)" />
        <rect x="6" y={lobbyTop} width={vbW - 12} height="2" fill="rgba(255,255,255,0.12)" />
        {/* lobby windows on both sides of the entrance */}
        <rect x="20" y={lobbyTop + 12} width={SIZE} height="22" rx="3" fill="rgba(202, 220, 246, 0.16)" />
        <rect x={vbW - 20 - SIZE} y={lobbyTop + 12} width={SIZE} height="22" rx="3" fill="rgba(202, 220, 246, 0.16)" />
        {/* entrance: awning, frame, glass double doors, handles, step */}
        <rect x={doorX - 6} y={doorY - 7} width={doorW + 12} height="5" rx="2" fill={ORANGE} />
        <rect x={doorX} y={doorY} width={doorW} height={doorH} rx="2" fill="rgba(255,255,255,0.22)" />
        <rect x={doorX + 3} y={doorY + 3} width={doorW / 2 - 4} height={doorH - 3} rx="1" fill="rgba(255,138,92,0.35)" />
        <rect x={doorX + doorW / 2 + 1} y={doorY + 3} width={doorW / 2 - 4} height={doorH - 3} rx="1" fill="rgba(255,138,92,0.35)" />
        <rect x={doorX + doorW / 2 - 4} y={doorY + doorH / 2} width="2" height="7" rx="1" fill="rgba(255,255,255,0.85)" />
        <rect x={doorX + doorW / 2 + 2} y={doorY + doorH / 2} width="2" height="7" rx="1" fill="rgba(255,255,255,0.85)" />
        <rect x={doorX - 4} y={groundY - 3} width={doorW + 8} height="3" fill="rgba(255,255,255,0.3)" />
        {/* ground line */}
        <rect x="0" y={groundY} width={vbW} height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        {windows.map((w) => {
          const info = roomInfo(layout, w.idx);
          const delay = 350 + w.idx * 26;
          const isSel = selected === w.idx;
          return (
            <rect
              key={w.idx}
              role="button"
              tabIndex={0}
              aria-pressed={isSel}
              aria-label={`${info.name}: ${info.line1}`}
              x={w.x}
              y={w.y}
              width={SIZE}
              height={SIZE}
              rx={4}
              fill={w.lit ? ORANGE : 'rgba(202, 220, 246, 0.16)'}
              stroke={isSel ? '#fff' : 'none'}
              strokeWidth={isSel ? 2.5 : 0}
              onClick={() => onSelect(w.idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(w.idx);
                }
              }}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: w.lit ? `kkPop .45s ease-out ${delay}ms both, kkWindow ${3.2 + (w.idx % 4) * 0.8}s ease-in-out ${delay + 700}ms infinite` : `kkPop .45s ease-out ${delay}ms both`,
              }}
            />
          );
        })}
      </svg>
    </Box>
  );
}

/** The building plus the room details panel. */
function BuildingCard({ layout }) {
  const [selected, setSelected] = useState(layout === 'tall' ? 7 : 3);
  const info = roomInfo(layout, selected);
  const wide = layout === 'wide';
  return (
    <Box sx={{ bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: R.lg, p: wide ? 2 : { xs: 3, sm: 3.5 } }}>
      <Building layout={layout} selected={selected} onSelect={setSelected} />
      <Box aria-live="polite" sx={{ mt: wide ? 2 : 3, borderRadius: R.md, bgcolor: 'rgba(255,255,255,0.07)', px: 2, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: HEAD, fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}>{info.name}</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {info.line1}
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0, px: 1.25, py: 0.5, borderRadius: 99, fontSize: '0.78rem', fontWeight: 700, bgcolor: info.lit ? 'rgba(255,69,0,0.2)' : 'rgba(255,255,255,0.1)', color: info.lit ? '#ff8a5c' : 'rgba(255,255,255,0.75)' }}>{info.line2}</Box>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', mt: 1.25, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        Sample building. Tap a room.
      </Typography>
    </Box>
  );
}

/* =================================================================== */
/*  Small pieces                                                        */
/* =================================================================== */

const Orange = ({ children }) => (
  <Box component="span" sx={{ color: 'primary.main' }}>
    {children}
  </Box>
);

const h2 = { fontFamily: HEAD, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, fontSize: { xs: '1.9rem', md: '2.6rem' }, textWrap: 'balance' };

function Bullets({ items, good }) {
  const Mark = good ? CheckRounded : CloseOutlined;
  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2.5, display: 'grid', gap: 1.25 }}>
      {items.map((t) => (
        <Box component="li" key={t} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: { xs: 15.5, md: 16.5 }, lineHeight: 1.45 }}>
          <Box sx={{ width: 26, height: 26, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: good ? ORANGE : '#fde4e2', color: good ? '#fff' : '#d7261e' }}>
            <Mark sx={{ fontSize: 16 }} />
          </Box>
          {t}
        </Box>
      ))}
    </Box>
  );
}

function Eyebrow({ children }) {
  return (
    <Typography variant="overline" component="p" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
      <Box component="span" sx={{ width: 24, height: 2, bgcolor: 'currentColor', borderRadius: '2px' }} />
      {children}
    </Typography>
  );
}

function SectionTitle({ eyebrow, children, intro }) {
  return (
    <Reveal sx={{ maxWidth: 720, mb: { xs: 5, md: 7 } }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 50 } }}>
        {children}
      </Typography>
      {intro && <Typography sx={{ mt: 2, fontSize: { xs: 16.5, md: 18.5 }, color: 'text.secondary' }}>{intro}</Typography>}
    </Reveal>
  );
}

const initials = (name) =>
  name
    .replace(/,.*$/, '')
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w) && !w.endsWith('.'))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

/** Fades and slides its content up the first time it scrolls into view. */
function Reveal({ children, delay = 0, sx, component = 'div' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const ease = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
  return (
    <Box
      ref={ref}
      component={component}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(24px)',
        transition: `opacity .7s ${ease} ${delay}ms, transform .7s ${ease} ${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', transition: 'none' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/** Highlights the nav link for the section currently on screen. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* =================================================================== */
/*  Page                                                                */
/* =================================================================== */

const NAV_IDS = NAV.map(([, id]) => id);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', overflowX: 'clip' }}>
      {AnimationStyles}

      {/* ================= Navbar ================= */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,.94)', backdropFilter: 'blur(10px)', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider', boxShadow: scrolled ? '0 6px 24px -14px rgba(32,32,32,.25)' : 'none', transition: 'box-shadow .3s' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 80 }, gap: 1.5 }}>
            <Box component="a" href="#home" aria-label="KwartoKeeper home" sx={{ mr: 'auto', display: 'flex' }}>
              <Box component="img" src={logoHorizontal} alt="KwartoKeeper" sx={{ display: 'block', height: { xs: 34, md: 44 }, width: 'auto' }} />
            </Box>
            <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
              {NAV.map(([label, id]) => {
                const on = active === id;
                return (
                  <Button
                    key={id}
                    href={`#${id}`}
                    aria-current={on ? 'true' : undefined}
                    sx={{
                      position: 'relative',
                      fontWeight: 600,
                      color: on ? 'text.primary' : 'text.secondary',
                      '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                      '&::after': { content: '""', position: 'absolute', left: 14, right: 14, bottom: 4, height: 2, borderRadius: R.sm, bgcolor: 'primary.main', transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform .25s' },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
            <IconButton aria-label="Open menu" onClick={() => setMenuOpen(true)} sx={{ display: { md: 'none' }, color: 'text.primary', mr: -1 }}>
              <MenuRounded />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ px: 2.5, pt: 2, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box component="img" src={logoHorizontal} alt="KwartoKeeper" sx={{ height: 32, width: 'auto' }} />
            <IconButton aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <CloseRounded />
            </IconButton>
          </Box>
          {NAV.map(([label, id]) => (
            <Button key={id} fullWidth href={`#${id}`} onClick={() => setMenuOpen(false)} sx={{ justifyContent: 'flex-start', py: 1.5, fontSize: '1.05rem', fontWeight: 700, color: active === id ? 'primary.main' : 'text.primary' }}>
              {label}
            </Button>
          ))}
        </Box>
      </Drawer>

      <main>
        {/* ================= Home ================= */}
        <Box id="home" component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: INK, color: '#fff', pt: { xs: 5, md: 10 }, pb: { xs: 6, md: 11 } }}>
          <Box aria-hidden sx={{ position: 'absolute', width: 640, height: 640, borderRadius: '50%', top: -300, right: -220, background: 'rgba(255,69,0,.26)', filter: 'blur(110px)' }} />
          <Box aria-hidden sx={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', bottom: -260, left: -180, background: 'rgba(202,220,246,.16)', filter: 'blur(100px)' }} />
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' }, gap: { xs: 5, md: 8 }, alignItems: 'center' }}>
              <Box>
                <Typography variant="h1" sx={{ fontFamily: HEAD, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05, fontSize: { xs: 'clamp(2.1rem, 8.6vw, 2.7rem)', sm: '3.1rem', md: 'clamp(3rem, 4.4vw, 3.8rem)' }, textWrap: 'balance', ...enter(60) }}>
                  An Integrated Occupancy Monitoring and Reporting System for <Orange>Safer Dormitory Living</Orange>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: { xs: 3.5, md: 4.5 }, '& > a': { flex: { xs: '1 1 auto', sm: '0 0 auto' } }, ...enter(160) }}>
                  <Button variant="contained" size="large" href="#contact" endIcon={<ArrowForwardRounded />} sx={{ py: 1.5, px: 3.5, fontWeight: 700, borderRadius: R.sm }}>
                    Get Started
                  </Button>
                  <Button size="large" href="#about" sx={{ py: 1.5, px: 3.5, fontWeight: 700, borderRadius: R.sm, color: '#fff', border: '1px solid rgba(255,255,255,.22)', '&:hover': { bgcolor: 'rgba(255,255,255,.08)' } }}>
                    Learn More
                  </Button>
                </Box>
                <Box sx={{ mt: { xs: 4, md: 5 }, ...enter(240) }}>
                  <Typography sx={{ fontFamily: HEAD, fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', mb: 1.25 }}>Built for</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(4, minmax(0, 1fr))', sm: 'repeat(4, max-content)' }, gap: 1 }}>
                    {USERS.map((x) => (
                      <Box key={x.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, px: { xs: 0.5, sm: 1.5 }, py: 0.75, borderRadius: R.sm, bgcolor: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', fontFamily: HEAD, fontWeight: 600, fontSize: { xs: 12.5, sm: 13.5 }, color: 'rgba(255,255,255,.88)', whiteSpace: 'nowrap', minWidth: 0 }}>
                        <x.icon sx={{ fontSize: 16, color: '#ff8a5c', display: { xs: 'none', sm: 'block' } }} />
                        {x.name}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* desktop: tall building */}
              <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%', maxWidth: 360, mx: 'auto', ...enter(180) }}>
                <BuildingCard layout="tall" />
              </Box>
              {/* phones and tablets: wide, short building */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', maxWidth: 520, mx: 'auto', ...enter(180) }}>
                <BuildingCard layout="wide" />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ================= About ================= */}
        <Container id="about" component="section" maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Reveal sx={{ textAlign: 'center', maxWidth: 780, mx: 'auto' }}>
            <Typography variant="h2" sx={h2}>
              About <Orange>KwartoKeeper</Orange>
            </Typography>
            <Typography sx={{ mt: 2, fontFamily: HEAD, fontWeight: 600, fontSize: { xs: '1.15rem', md: '1.35rem' } }}>
              Keeping every room a safe, connected home away from home.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.65, maxWidth: 620, mx: 'auto' }}>
              Rooms, tenants, rent, and repairs in one system, built around resident safety and parent transparency.
            </Typography>
          </Reveal>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 4 }, mt: { xs: 6, md: 8 } }}>
            <Reveal sx={{ p: { xs: 3, md: 4 }, borderRadius: R.lg, bgcolor: '#fff', border: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontFamily: HEAD, fontWeight: 700, fontSize: 12.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#d7261e' }}>Without KwartoKeeper</Typography>
              <Typography sx={{ fontFamily: HEAD, fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.55rem' }, mt: 0.5 }}>Notebooks and group chats</Typography>
              <Bullets items={CHALLENGES} />
            </Reveal>
            <Reveal delay={120} sx={{ p: { xs: 3, md: 4 }, borderRadius: R.lg, bgcolor: BRAND.cream, border: '1px solid', borderColor: 'rgba(255,69,0,.25)', boxShadow: '0 24px 50px -34px rgba(255,69,0,.6)' }}>
              <Typography sx={{ fontFamily: HEAD, fontWeight: 700, fontSize: 12.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main' }}>With KwartoKeeper</Typography>
              <Typography sx={{ fontFamily: HEAD, fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.55rem' }, mt: 0.5 }}>One safe, connected system</Typography>
              <Bullets items={SOLUTIONS} good />
            </Reveal>
          </Box>
        </Container>

        {/* ================= Features + Users ================= */}
        <Box component="section" id="features" sx={{ bgcolor: '#fff', borderTop: 1, borderBottom: 1, borderColor: 'divider', py: { xs: 9, md: 13 } }}>
          <Container maxWidth="lg">
            <SectionTitle eyebrow="Features" intro="On the web for the office, on mobile for the building.">
              Everything a small dorm needs, <Orange>in one place.</Orange>
            </SectionTitle>
            <Grid container spacing={2}>
              {FEATURES.map(({ icon: Icon, title, body }, i) => (
                <Grid key={title} size={{ xs: 12, md: i === 0 || i === 3 ? 7 : 5 }}>
                  <Reveal delay={(i % 2) * 100} sx={{ height: '100%' }}>
                    <Box
                      sx={{
                        height: '100%',
                        p: { xs: 3, md: 4 },
                        borderRadius: R.lg,
                        bgcolor: i === 1 ? BRAND.orange : i === 2 ? BRAND.blue : BRAND.cream,
                        color: i === 1 ? '#fff' : BRAND.charcoal,
                        transition: 'transform .25s, box-shadow .25s',
                        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 18px 36px -24px rgba(32,32,32,.35)' },
                      }}
                    >
                      <Icon sx={{ fontSize: 40, color: i === 1 ? '#fff' : i === 2 ? BRAND.charcoal : 'primary.main' }} />
                      <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, mt: 2 }}>
                        {title}
                      </Typography>
                      <Typography sx={{ mt: 1, fontSize: { xs: 16, md: 17 }, opacity: i === 1 ? 0.92 : 1, color: i === 1 ? 'inherit' : 'text.secondary', maxWidth: 440 }}>{body}</Typography>
                    </Box>
                  </Reveal>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, mt: { xs: 8, md: 11 }, mb: 3 }}>
              Four accounts, four views
            </Typography>
            <Reveal sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, border: 1, borderColor: 'divider', borderRadius: R.lg, bgcolor: '#fff', overflow: 'hidden' }}>
              {USERS.map(({ icon: Icon, name, body }, i) => (
                <Box key={name} sx={{ p: 3, borderLeft: { sm: i % 2 ? 1 : 0, md: i ? 1 : 0 }, borderTop: { xs: i ? 1 : 0, sm: i >= 2 ? 1 : 0, md: 0 }, borderColor: 'divider' }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: R.sm, bgcolor: BRAND.cream, color: 'primary.main', display: 'grid', placeItems: 'center' }}>
                    <Icon />
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: 20, mt: 2 }}>
                    {name}
                  </Typography>
                  <Typography sx={{ mt: 0.75, fontSize: 15, color: 'text.secondary' }}>{body}</Typography>
                </Box>
              ))}
            </Reveal>

            {/* SDGs */}
            <Reveal sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontFamily: HEAD, fontWeight: 700, fontSize: 14, color: 'text.secondary', mr: 1 }}>Aligned with</Typography>
              {SDGS.map(([n, name, color]) => (
                <Box key={n} sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: color, color: '#fff', borderRadius: R.sm, pl: 1, pr: 1.5, py: 0.75, maxWidth: '100%' }}>
                  <Typography sx={{ fontFamily: HEAD, fontWeight: 900, fontSize: 18 }}>{n}</Typography>
                  <Typography sx={{ fontFamily: HEAD, fontWeight: 600, fontSize: 13 }}>{name}</Typography>
                </Box>
              ))}
            </Reveal>
          </Container>
        </Box>

        {/* ================= Contact + Team (Get Started lands here) ================= */}
        <Box component="section" id="contact" sx={{ py: { xs: 9, md: 13 } }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' }, gap: { xs: 6, md: 7 }, alignItems: 'center' }}>
              {/* contact details */}
              <Reveal>
                <Eyebrow>Contact</Eyebrow>
                <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 48 } }}>
                  Get in <Orange>touch.</Orange>
                </Typography>
                <Typography sx={{ mt: 2, fontSize: { xs: 16.5, md: 18 }, color: 'text.secondary', maxWidth: 480 }}>
                  Run a dormitory in Region 02? Let&rsquo;s set up a walkthrough.
                </Typography>

                <Box sx={{ mt: { xs: 4, md: 5 }, display: 'grid', gap: 1.5 }}>
                  {[
                    { icon: PlaceOutlined, label: 'Address', value: ADDRESS },
                    { icon: MailOutlineRounded, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                    { icon: PhoneOutlined, label: 'Phone', value: PHONE_DISPLAY, href: PHONE_LINK },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <Box
                      key={label}
                      component={href ? 'a' : 'div'}
                      href={href}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: { xs: 1.75, md: 2 },
                        borderRadius: R.md,
                        bgcolor: '#fff',
                        color: 'text.primary',
                        textDecoration: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'border-color .2s, transform .2s',
                        '&:hover': href ? { borderColor: 'primary.main', transform: 'translateX(4px)' } : undefined,
                      }}
                    >
                      {/* icon tile styled like a lit window from the building */}
                      <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: R.sm, bgcolor: ORANGE, color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 8px 18px -8px rgba(255,69,0,.7)' }}>
                        <Icon />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontFamily: HEAD, fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'text.secondary' }}>{label}</Typography>
                        <Typography sx={{ fontFamily: HEAD, fontWeight: 700, fontSize: { xs: 16, md: 18 }, wordBreak: 'break-word' }}>{value}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Reveal>

              {/* team card, dark like the hero */}
              <Reveal delay={120} sx={{ position: 'relative', overflow: 'hidden', bgcolor: INK, color: '#fff', borderRadius: R.xl, p: { xs: 3, sm: 4, md: 5 } }}>
                <Box aria-hidden sx={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', top: -200, right: -140, background: 'rgba(255,69,0,.28)', filter: 'blur(90px)' }} />
                <Box aria-hidden sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', bottom: -180, left: -120, background: 'rgba(202,220,246,.14)', filter: 'blur(80px)' }} />
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontFamily: HEAD, fontWeight: 700, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#ff8a5c' }}>The KwartoKeepers</Typography>
                      <Typography sx={{ fontFamily: HEAD, fontWeight: 800, fontSize: { xs: 26, md: 30 }, letterSpacing: '-0.02em', mt: 0.5 }}>Meet the team</Typography>
                    </Box>
                    {/* little row of building windows */}
                    <Box aria-hidden sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 12px)', gap: '5px', flexShrink: 0, mb: 0.75 }}>
                      {[1, 0, 1, 1, 0, 1, 0, 1].map((lit, k) => (
                        <Box key={k} sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: lit ? ORANGE : 'rgba(202,220,246,.18)' }} />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: { xs: 3.5, md: 4.5 }, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 2, rowGap: { xs: 4, md: 5 } }}>
                    {TEAM.map(([name, roleName, photo]) => {
                      const mentor = roleName === 'Mentor';
                      return (
                        <Box key={name} sx={{ textAlign: 'center', minWidth: 0 }}>
                          <Box sx={{ position: 'relative', width: { xs: 108, sm: 140, md: 156 }, mx: 'auto' }}>
                            <Avatar
                              src={photo}
                              alt={name}
                              sx={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '1 / 1',
                                bgcolor: '#2e2e2e',
                                fontFamily: HEAD,
                                fontWeight: 800,
                                fontSize: { xs: 30, md: 40 },
                                border: '4px solid',
                                borderColor: mentor ? ORANGE : 'rgba(255,255,255,.14)',
                                boxShadow: mentor ? '0 0 0 6px rgba(255,69,0,.18)' : 'none',
                              }}
                            >
                              {initials(name)}
                            </Avatar>
                            <Box
                              sx={{
                                position: 'absolute',
                                left: '50%',
                                bottom: -10,
                                transform: 'translateX(-50%)',
                                whiteSpace: 'nowrap',
                                px: 1.5,
                                py: 0.4,
                                borderRadius: 99,
                                fontFamily: HEAD,
                                fontWeight: 700,
                                fontSize: { xs: 11.5, md: 12.5 },
                                bgcolor: mentor ? ORANGE : BRAND.cream,
                                color: mentor ? '#fff' : INK,
                              }}
                            >
                              {roleName}
                            </Box>
                          </Box>
                          <Typography sx={{ mt: 2.5, fontFamily: HEAD, fontWeight: 700, fontSize: { xs: 14.5, md: 16.5 }, lineHeight: 1.3 }}>{name}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Reveal>
            </Box>
          </Container>
        </Box>
      </main>

      {/* ================= Footer ================= */}
      <Box component="footer" sx={{ mt: 'auto', position: 'relative', overflow: 'hidden', bgcolor: INK, color: 'rgba(255,255,255,.65)', pt: { xs: 7, md: 9 }, pb: 'calc(28px + env(safe-area-inset-bottom, 0px))' }}>
        <Box aria-hidden sx={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', top: -320, left: -200, background: 'rgba(255,69,0,.14)', filter: 'blur(110px)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '2fr 1fr 1fr' }, columnGap: { xs: 3, md: 6 }, rowGap: { xs: 5, md: 0 } }}>
            {/* brand */}
            <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
              <Box component="img" src={logoDark} alt="KwartoKeeper" sx={{ height: { xs: 64, md: 76 }, width: 'auto' }} />
              <Typography sx={{ mt: 2.5, maxWidth: 340, fontFamily: HEAD, fontWeight: 700, fontSize: { xs: 16, md: 17 }, lineHeight: 1.45, color: '#fff' }}>
                Keeping every room a safe, connected home away from home.
              </Typography>
            </Box>

            {/* link columns */}
            {FOOTER_LINKS.map(([heading, links]) => (
              <Box key={heading} component="nav" aria-label={heading}>
                <Typography sx={{ fontFamily: HEAD, fontWeight: 800, fontSize: 16, color: '#fff', mb: 2.25 }}>{heading}</Typography>
                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  {links.map(([label, href]) => (
                    <Box key={label} component="a" href={href} sx={{ width: 'fit-content', color: 'inherit', textDecoration: 'none', fontSize: 15.5, transition: 'color .2s', '&:hover': { color: '#ff8a5c' } }}>
                      {label}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: { xs: 6, md: 8 }, pt: 3, borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 1, fontSize: 14, color: 'rgba(255,255,255,.5)' }}>
            <span>&copy; {new Date().getFullYear()} KwartoKeeper. All rights reserved.</span>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}