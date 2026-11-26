import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BowlFood, Cake, Coffee, MagnifyingGlass, Minus, Plus, ShoppingBag, Trash, X, GlobeHemisphereWest, Leaf, ShieldCheck, Flame } from '@phosphor-icons/react'
import { useI18n } from './i18n'

type Dish = { id: string; name: { en: string; ar: string }; desc: { en: string; ar: string }; price: number; cat: string; veg: boolean; vegan: boolean; gf: boolean; spicy: boolean; icon: 'soup' | 'main' | 'cake' | 'drink'; color: string; image: string }

const MENU: Dish[] = [
  { id: 'd1', name: { en: 'Lentil soup', ar: 'شوربة عدس' }, desc: { en: 'Red lentils, cumin and lemon, served with toasted bread', ar: 'عدس أحمر وكمون وليمون، يقدم مع خبز محمص' }, price: 87, cat: 'starters', veg: true, vegan: true, gf: false, spicy: false, icon: 'soup', color: '#fef3c7', image: 'https://images.pexels.com/photos/27950501/pexels-photo-27950501/free-photo-of-a-plate-with-soup-and-a-flower-on-it.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd2', name: { en: 'Hummus and warm bread', ar: 'حمص وخبز دافئ' }, desc: { en: 'Chickpea hummus with olive oil and paprika', ar: 'حمص بالطحينة مع زيت زيتون وبابريكا' }, price: 93, cat: 'starters', veg: true, vegan: true, gf: false, spicy: false, icon: 'soup', color: '#fef3c7', image: 'https://images.pexels.com/photos/6419720/pexels-photo-6419720.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd3', name: { en: 'Fattoush salad', ar: 'سلطة فتوش' }, desc: { en: 'Mixed greens, tomato, cucumber and crisp bread with sumac', ar: 'خضار مشكلة وطماطم وخيار وخبز مقرمش مع سماق' }, price: 109, cat: 'starters', veg: true, vegan: true, gf: false, spicy: false, icon: 'soup', color: '#dcfce7', image: 'https://images.pexels.com/photos/29389647/pexels-photo-29389647/free-photo-of-lebanese-cuisine-with-fresh-salad-and-pita.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd4', name: { en: 'Grilled chicken with rice', ar: 'دجاج مشوي مع أرز' }, desc: { en: 'Charcoal grilled chicken, saffron rice and grilled vegetables', ar: 'دجاج مشوي على الفحم، أرز بالزعفران وخضار مشوية' }, price: 247, cat: 'mains', veg: false, vegan: false, gf: true, spicy: false, icon: 'main', color: '#ffedd5', image: 'https://images.pexels.com/photos/1633668/pexels-photo-1633668.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd5', name: { en: 'Koshari', ar: 'كشري' }, desc: { en: 'Rice, lentils, pasta and chickpeas with tomato sauce and fried onion', ar: 'أرز وعدس ومكرونة وحمص مع صلصة طماطم وبصل مقلي' }, price: 131, cat: 'mains', veg: true, vegan: true, gf: false, spicy: true, icon: 'main', color: '#ffedd5', image: 'https://images.pexels.com/photos/36734920/pexels-photo-36734920/free-photo-of-middle-eastern-cuisine-on-wooden-table.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd6', name: { en: 'Baked fish with lemon', ar: 'سمك مشوي بالليمون' }, desc: { en: 'Baked sea bass, lemon butter and herbs, served with potatoes', ar: 'قاروص مشوي، زبدة ليمون وأعشاب، يقدم مع بطاطس' }, price: 289, cat: 'mains', veg: false, vegan: false, gf: true, spicy: false, icon: 'main', color: '#dbeafe', image: 'https://images.pexels.com/photos/22994309/pexels-photo-22994309/free-photo-of-selective-focus-shot-of-a-seafood-meal.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd7', name: { en: 'Mushroom pasta', ar: 'مكرونة بالمشروم' }, desc: { en: 'Creamy mushroom sauce, parmesan and fresh thyme', ar: 'صلصة مشروم كريمية وبارميزان وزعتر طازج' }, price: 213, cat: 'mains', veg: true, vegan: false, gf: false, spicy: false, icon: 'main', color: '#fef3c7', image: 'https://images.pexels.com/photos/15671411/pexels-photo-15671411/free-photo-of-meal-on-plate.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd8', name: { en: 'Molokhia with chicken', ar: 'ملوخية بالدجاج' }, desc: { en: 'Molokhia with garlic and coriander, chicken and rice', ar: 'ملوخية بالثوم والكزبرة، دجاج وأرز' }, price: 197, cat: 'mains', veg: false, vegan: false, gf: true, spicy: false, icon: 'main', color: '#dcfce7', image: 'https://images.pexels.com/photos/30119029/pexels-photo-30119029/free-photo-of-middle-eastern-feast-with-halal-cuisine-in-vancouver.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd9', name: { en: 'Basbousa with cream', ar: 'بسبوسة بالقشطة' }, desc: { en: 'Semolina cake with cream and pistachio', ar: 'كيك سميد بالقشطة والفستق' }, price: 76, cat: 'desserts', veg: true, vegan: false, gf: false, spicy: false, icon: 'cake', color: '#fce7f3', image: 'https://images.pexels.com/photos/38495644/pexels-photo-38495644/free-photo-of-close-up-of-delicious-pistachio-baklava-dessert.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd10', name: { en: 'Rice pudding', ar: 'أرز باللبن' }, desc: { en: 'Slow cooked rice pudding with cinnamon and nuts', ar: 'أرز باللبن مطهو ببطء مع قرفة ومكسرات' }, price: 63, cat: 'desserts', veg: true, vegan: false, gf: true, spicy: false, icon: 'cake', color: '#fce7f3', image: 'https://images.pexels.com/photos/4393017/pexels-photo-4393017.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd11', name: { en: 'Fresh orange juice', ar: 'عصير برتقال طازج' }, desc: { en: 'Freshly squeezed oranges, no added sugar', ar: 'برتقال طازج معصور، بدون سكر مضاف' }, price: 58, cat: 'drinks', veg: true, vegan: true, gf: true, spicy: false, icon: 'drink', color: '#ffedd5', image: 'https://images.pexels.com/photos/36325929/pexels-photo-36325929/free-photo-of-assorted-traditional-middle-eastern-iftar-meal.jpeg?cs=tinysrgb&dpr=1&w=500' },
  { id: 'd12', name: { en: 'Mint tea', ar: 'شاي بالنعناع' }, desc: { en: 'Black tea with fresh mint, served hot', ar: 'شاي أسود بالنعناع الطازج، يقدم ساخنا' }, price: 41, cat: 'drinks', veg: true, vegan: true, gf: true, spicy: false, icon: 'drink', color: '#dcfce7', image: 'https://images.pexels.com/photos/36228288/pexels-photo-36228288/free-photo-of-fresh-mint-tea-in-glass-teapot-and-cups.jpeg?cs=tinysrgb&dpr=1&w=500' },
]

const CAT_ICONS: Record<string, ReactNode> = { starters: <BowlFood size={18} />, mains: <BowlFood size={18} />, desserts: <Cake size={18} />, drinks: <Coffee size={18} /> }

export default function App() {
  const { lang, setLang, t } = useI18n('restaurant-menu-lang')
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [filters, setFilters] = useState({ veg: false, vegan: false, gf: false, spicy: false })
  const [cart, setCart] = useState<Record<string, number>>({})
  const [note, setNote] = useState('')
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const filtered = useMemo(() => MENU.filter((d) => {
    if (cat !== 'all' && d.cat !== cat) return false
    if (filters.veg && !d.veg) return false
    if (filters.vegan && !d.vegan) return false
    if (filters.gf && !d.gf) return false
    if (filters.spicy && !d.spicy) return false
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      if (!(d.name.en.toLowerCase().includes(q) || d.name.ar.includes(q) || d.desc.en.toLowerCase().includes(q) || d.desc.ar.includes(q))) return false
    }
    return true
  }), [cat, filters, search])

  const cartItems = useMemo(() => MENU.filter((d) => cart[d.id] > 0).map((d) => ({ dish: d, qty: cart[d.id] })), [cart])
  const total = cartItems.reduce((a, x) => a + x.dish.price * x.qty, 0)
  const cartCount = cartItems.reduce((a, x) => a + x.qty, 0)

  const add = (id: string) => { setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 })); setJustAdded(id); setTimeout(() => setJustAdded(null), 1500) }
  const setQty = (id: string, qty: number) => setCart((p) => { const n = { ...p }; if (qty <= 0) delete n[id]; else n[id] = qty; return n })


  return (
    <div className="min-h-screen bg-white text-[#181818]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
      <header className="sticky top-4 z-10 mx-auto max-w-6xl px-4">
        <nav className="flex items-center justify-between gap-4 rounded-2xl border border-[#e3e3e3] bg-white/90 px-4 py-3 shadow-sm backdrop-blur" aria-label="Main">
          <span className="title-1 flex items-center gap-2"><BowlFood size={22} className="text-[#b45309]" />{t('appName')}</span>
          <span className="flex items-center gap-2">
            <button type="button" onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })} className="button-sm relative flex items-center gap-2 rounded-xl bg-[#b45309] px-3 py-2 text-white motion-hover hover:bg-[#92400e] active:scale-[0.98]">
              <ShoppingBag size={18} />{t('ctaOrder')}{cartCount > 0 && <span className="absolute -top-2 -end-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#181818] text-xs font-semibold text-white">{cartCount}</span>}
            </button>
            <button type="button" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="button-sm flex items-center gap-2 rounded-xl border border-[#e3e3e3] px-3 py-2 motion-hover hover:bg-[#f5f5f5] active:scale-[0.98]"><GlobeHemisphereWest size={18} />{lang === 'en' ? t('langAr') : t('langEn')}</button>
          </span>
        </nav>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4">
        <section className="py-16 md:py-24">
          <p className="caption-2 text-[#b45309]">{t('tagline')}</p>
          <h1 className="heading-1 hero-gradient mt-4 max-w-[680px]">{t('heroTitle')}</h1>
          <p className="body-3 mt-4 max-w-[680px] text-[#555555]">{t('heroSub')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="button-md rounded-xl bg-[#b45309] px-3 py-2 text-white motion-hover hover:bg-[#92400e] active:scale-[0.98]">{t('ctaStart')}</button>
          </div>
        </section>

        <section id="menu" className="pb-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <MagnifyingGlass size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('searchPh')} className="w-full rounded-xl border border-[#e3e3e3] py-4 pe-4 ps-12 body-3" aria-label={t('searchPh')} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            {['all', 'starters', 'mains', 'desserts', 'drinks'].map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`button-sm flex items-center gap-2 rounded-xl px-3 py-2 motion-hover active:scale-[0.98] ${cat === c ? 'bg-[#181818] text-white' : 'border border-[#e3e3e3] hover:bg-[#f5f5f5]'}`}>
                {c !== 'all' && CAT_ICONS[c]}{t(c === 'all' ? 'all' : `cat${c.charAt(0).toUpperCase() + c.slice(1)}`)}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(['veg', 'vegan', 'gf', 'spicy'] as const).map((f) => (
              <button key={f} type="button" aria-pressed={filters[f]} onClick={() => setFilters({ ...filters, [f]: !filters[f] })} className={`button-sm flex items-center gap-2 rounded-full px-3 py-2 motion-hover active:scale-[0.98] ${filters[f] ? 'bg-[#b45309] text-white' : 'border border-[#e3e3e3] hover:bg-[#f5f5f5]'}`}>
                {f === 'veg' || f === 'vegan' ? <Leaf size={16} /> : f === 'gf' ? <ShieldCheck size={16} /> : <Flame size={16} />}{t(f === 'veg' ? 'filterVeg' : f === 'vegan' ? 'filterVegan' : f === 'gf' ? 'filterGlutenFree' : 'filterSpicy')}
              </button>
            ))}
            {(filters.veg || filters.vegan || filters.gf || filters.spicy || search) && (
              <button type="button" onClick={() => { setFilters({ veg: false, vegan: false, gf: false, spicy: false }); setSearch('') }} className="button-sm flex items-center gap-1 rounded-xl border border-[#e3e3e3] px-3 py-2 text-red-700 motion-hover hover:bg-red-50 active:scale-[0.98]"><X size={16} />{t('clearFilters')}</button>
            )}
          </div>
          <p className="caption-2 mt-6 text-[#555555]">{filtered.length} {t('results')} · <span className="rounded-full bg-[#fef3c7] px-2 py-1">{t('sample')}</span></p>
          {filtered.length === 0 ? (
            <p className="body-3 mt-4 rounded-2xl border border-dashed border-[#e3e3e3] p-8 text-center text-[#555555]">{t('noDishes')}</p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => (
                <article key={d.id} className="flex flex-col rounded-2xl border border-[#e3e3e3] overflow-hidden motion-hover hover:border-[#b45309]">
                  <img src={d.image} alt={lang === 'ar' ? d.name.ar : d.name.en} loading="lazy" className="h-24 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="title-2">{lang === 'ar' ? d.name.ar : d.name.en}</h3>
                      <span className="title-3 shrink-0">{d.price} {t('currency')}</span>
                    </div>
                    <p className="body-6 mt-2 flex-1 text-[#555555]">{lang === 'ar' ? d.desc.ar : d.desc.en}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {d.veg && <span className="caption-4 rounded-full bg-[#dcfce7] px-2 py-1">{t('filterVeg')}</span>}
                      {d.vegan && <span className="caption-4 rounded-full bg-[#dcfce7] px-2 py-1">{t('filterVegan')}</span>}
                      {d.gf && <span className="caption-4 rounded-full bg-[#dbeafe] px-2 py-1">{t('filterGlutenFree')}</span>}
                      {d.spicy && <span className="caption-4 rounded-full bg-[#fee2e2] px-2 py-1">{t('filterSpicy')}</span>}
                    </div>
                    <button type="button" onClick={() => add(d.id)} className={`button-md mt-4 flex items-center justify-center gap-2 rounded-xl px-3 py-2 motion-hover active:scale-[0.98] ${justAdded === d.id ? 'bg-[#0f766e] text-white' : 'bg-[#b45309] text-white hover:bg-[#92400e]'}`}>
                      <Plus size={18} />{justAdded === d.id ? t('added') : t('addToOrder')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="order" className="pb-16">
          <h2 className="heading-5">{t('order')}</h2>
          <div className="mt-6 rounded-2xl border border-[#e3e3e3] p-4 md:p-8">
            {cartItems.length === 0 ? (
              <p className="body-3 rounded-xl bg-[#f5f5f5] p-8 text-center text-[#555555]">{t('orderEmpty')}</p>
            ) : (
              <div>
                <ul className="space-y-2">
                  {cartItems.map(({ dish, qty }) => (
                    <li key={dish.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e3e3e3] p-4">
                      <span className="body-3">{lang === 'ar' ? dish.name.ar : dish.name.en}</span>
                      <span className="flex items-center gap-2">
                        <button type="button" onClick={() => setQty(dish.id, qty - 1)} className="rounded-lg border border-[#e3e3e3] p-2 motion-hover hover:bg-[#f5f5f5] active:scale-[0.98]" aria-label={t('quantity')}><Minus size={16} /></button>
                        <span className="body-5 w-6 text-center">{qty}</span>
                        <button type="button" onClick={() => setQty(dish.id, qty + 1)} className="rounded-lg border border-[#e3e3e3] p-2 motion-hover hover:bg-[#f5f5f5] active:scale-[0.98]" aria-label={t('quantity')}><Plus size={16} /></button>
                        <span className="body-5 w-20 text-end">{dish.price * qty} {t('currency')}</span>
                        <button type="button" onClick={() => setQty(dish.id, 0)} className="text-red-700" aria-label={t('remove')}><Trash size={18} /></button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div><label htmlFor="kitchen-note" className="title-4 mt-6 block">{t('note')}</label>
                  <input id="kitchen-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('notePh')} className="mt-2 w-full rounded-xl border border-[#e3e3e3] p-4 body-3" /></div>
                <div className="mt-6 flex items-center justify-between border-t border-[#e3e3e3] pt-4">
                  <span className="title-2">{t('total')}</span>
                  <span className="heading-6">{total} {t('currency')}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button type="button" onClick={() => { setOrderNumber(`ST-${Math.floor(100 + Math.random() * 900)}`); setCart({}); setNote('') }} className="button-md rounded-xl bg-[#b45309] px-3 py-2 text-white motion-hover hover:bg-[#92400e] active:scale-[0.98]">{t('placeOrder')}</button>
                  <button type="button" onClick={() => { setCart({}); setNote('') }} className="button-md rounded-xl border border-[#e3e3e3] px-3 py-2 motion-hover hover:bg-[#f5f5f5] active:scale-[0.98]">{t('clearOrder')}</button>
                </div>
              </div>
            )}
            {orderNumber && <p className="body-5 mt-6 rounded-xl bg-[#dcfce7] p-4" role="status">{t('orderPlaced').replace('{{number}}', orderNumber)}</p>}
          </div>
        </section>
      </main>
      <footer className="border-t border-[#e3e3e3] py-8">
        <p className="caption-2 mx-auto max-w-6xl px-4 text-[#555555]">{t('footerNote')}</p>
      </footer>
    </div>
  )
}
