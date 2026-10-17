import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {shopOdds, level7FourCostFiveSlots, level8FourCostFiveSlots, OddsLevel} from '../data/shopOdds';
import {interestTable} from '../data/examples';
import {ChampionCard} from '../components/ChampionCard';
import {ChampionPool} from '../components/ChampionPool';
import {GoldCounter} from '../components/GoldCounter';
import {SectionHeading, Tag} from '../components/UI';
import {ShopOddsChart} from '../components/ShopOddsChart';
import {TFTShop} from '../components/TFTShop';

const Backdrop: React.FC<{scene: number; children: React.ReactNode}> = ({scene, children}) => <div className={`scene scene-${scene}`}>
  <div className="scene-grid" /><div className="scene-glow scene-glow--a" /><div className="scene-glow scene-glow--b" />
  <div className="scene-grain" />
  <div className="scene-meta"><span>CHIẾN THUẬT / CỬA HÀNG</span><span>HƯỚNG DẪN CƠ CHẾ <b>•</b> 02:00</span></div>
  <div className="scene-content">{children}</div>
  <div className="scene-corners"><i /><i /><i /><i /></div>
</div>;

const RuleLine: React.FC<{children: React.ReactNode; index: number; accent?: string}> = ({children, index, accent = '#F1C75B'}) => <div className="rule-line" style={{'--rule-accent': accent} as React.CSSProperties}><span>{String(index).padStart(2, '0')}</span><b>{children}</b><i>↗</i></div>;

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleScale = interpolate(frame, [105, 160], [0.88, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.18, 0.75, 0.2, 1)});
  const dim = frame > 174;
  return <Backdrop scene={1}>
    <div className={`intro-shop ${dim ? 'intro-shop--dim' : ''}`}><TFTShop frame={frame} gold={50} level={7} refreshEvery={68} cursor /></div>
    <div className="intro-side-note"><Tag accent="#51A6FF">MAY MẮN CHỈ LÀ MỘT PHẦN</Tag><div className="intro-stat"><b>5</b><span>Ô TƯỚNG<br/>MỖI LẦN ĐỔI</span></div><div className="intro-stat"><b>2</b><span>VÀNG<br/>MỖI LẦN ROLL</span></div><div className="intro-line" /></div>
    <div className="intro-title" style={{scale: titleScale, opacity: interpolate(frame, [96, 122, 260, 270], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><div className="intro-kicker">XÁC SUẤT · CẤP ĐỘ · KINH TẾ</div><h1>ROLL TRONG<br/><em>TFT</em></h1><p>Tại sao roll mãi vẫn không ra tướng?</p></div>
    <div className="intro-bottom"><span>HỌC CÁCH ĐỌC CỬA HÀNG</span><b>01 — 08</b></div>
  </Backdrop>;
};

export const ShopMechanicScene: React.FC = () => {
  const frame = useCurrentFrame();
  return <Backdrop scene={2}>
    <SectionHeading index={2} eyebrow="MỘT THAO TÁC, NĂM CƠ HỘI" title="Mỗi lần đổi, năm ô mới" detail="Từng ô được tạo riêng theo tỷ lệ ở cấp hiện tại." />
    <div className="mechanic-layout">
      <div className="mechanic-shop-wrap"><TFTShop frame={frame} gold={30} level={6} refreshEvery={83} cursor /></div>
      <div className="mechanic-steps">
        <div className="mechanic-equation"><span>1 LẦN ROLL</span><b>→</b><strong>5 Ô MỚI</strong></div>
        <div className="mechanic-steps-flow"><div className="mechanic-node"><span>01</span><b>BẬC GIÁ</b><small>TỶ LỆ THEO CẤP</small></div><i>↓</i><div className="mechanic-node"><span>02</span><b>VỊ TƯỚNG</b><small>CHỌN TỪ BỂ CÒN LẠI</small></div><i>↓</i><div className="mechanic-node"><span>03</span><b>MUA / BỎ QUA</b><small>QUYẾT ĐỊNH CỦA BẠN</small></div></div>
        <div className="mechanic-lock"><span>▣</span> KHÓA CỬA HÀNG ĐỂ GIỮ LẠI</div>
      </div>
    </div>
    <div className="mechanic-footer"><span>MỖI Ô LÀ MỘT LẦN RÚT RIÊNG</span><b>−2 VÀNG / LẦN ĐỔI</b></div>
  </Backdrop>;
};

const levelSequence: OddsLevel[] = [5, 6, 7, 8, 9];
const focusSequence = [1, 2, 3, 4, 5];
export const ShopOddsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const step = Math.min(4, Math.floor(frame / (3.45 * fps)));
  const level = levelSequence[step];
  const focusCost = focusSequence[step];
  return <Backdrop scene={3}>
    <SectionHeading index={3} eyebrow="CẤP ĐỘ ĐỊNH HÌNH CỬA HÀNG" title="Lên cấp, tỷ lệ đổi khác" detail="Tỷ lệ áp dụng cho từng ô — không phải xác suất ra đúng một vị tướng." />
    <div className="odds-layout">
      <div className="odds-main">
        <div className="level-selector">{levelSequence.map((item, i) => <div key={item} className={`level-tab ${item === level ? 'level-tab--active' : ''}`}><small>CẤP</small><b>{item}</b><span>{item === 5 ? 'TƯỚNG RẺ' : item === 7 ? '3 VÀNG' : item === 8 ? '4 VÀNG' : item === 9 ? '5 VÀNG' : 'CÂN BẰNG'}</span></div>)}</div>
        <ShopOddsChart level={level} focusCost={focusCost} frame={frame % 104} />
        <div className="odds-shop-row"><span>VÍ DỤ NĂM Ô SHOP</span><div>{[1, 2, 3, 4, 5].map((cost, i) => <div key={i} className={`odds-mini ${focusCost === cost ? 'odds-mini--active' : ''}`} style={{'--mini-color': shopOdds.colors[cost - 1], scale: interpolate(frame - i * 3, [0, 12], [0.86, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} as React.CSSProperties}><span>{cost}</span><small>VÀNG</small></div>)}</div></div>
      </div>
      <div className="odds-insight"><div className="odds-insight-mark">{focusCost}×</div><div className="odds-insight-label">TƯỚNG {focusCost} VÀNG</div><div className="odds-insight-value">{shopOdds.byLevel[level][focusCost - 1]}<small>%</small></div><div className="odds-insight-caption">CHO MỖI Ô</div><div className="odds-insight-rule" /><p>{focusCost === 1 ? 'Cấp thấp tăng lượt gặp tướng giá rẻ.' : focusCost === 2 ? 'Ở cấp sáu, hai vàng thường xuất hiện.' : focusCost === 3 ? 'Cấp bảy thường được dùng để tìm tướng ba vàng.' : focusCost === 4 ? 'Cấp tám làm tỷ lệ bốn vàng nhảy lên.' : 'Cấp chín tăng cơ hội gặp tướng năm vàng.'}</p></div>
    </div>
    <div className="source-note">{shopOdds.source.toUpperCase()} · ĐỐI CHIẾU PATCH TRƯỚC KHI XUẤT BẢN</div>
    <div className="odds-bottom-callout"><b>HẠNG TƯỚNG</b><span>≠</span><b>TƯỚNG CỤ THỂ BẠN CẦN</b></div>
  </Backdrop>;
};

export const SharedPoolScene: React.FC = () => {
  const frame = useCurrentFrame();
  return <Backdrop scene={4}>
    <SectionHeading index={4} eyebrow="TÁM NGƯỜI CHƠI · MỘT BỂ" title="Đối thủ mua, cơ hội của bạn giảm" detail="Tướng đã nằm trên bàn hoặc hàng chờ không còn trong bể chung." />
    <div className="pool-layout"><div className="pool-map-wrap"><ChampionPool /></div><div className="pool-explain">
      <Tag accent="#BF8BFF">VÍ DỤ MINH HỌA</Tag><div className="pool-example-title">TƯỚNG A<br/><em>4 VÀNG</em></div>
      <div className="pool-equation"><span>10</span><i>−</i><span className="pool-minus">3</span><i>=</i><b>7</b><small>BẢN SAO CÒN LẠI</small></div>
      <div className="pool-stars"><div className="stars-input"><i>✦</i><i>✦</i><i>✦</i></div><span>→</span><div className="stars-output"><b>★★</b><small>2 SAO</small></div></div>
      <div className="pool-stars pool-stars--small"><div className="stars-input"><i>✦</i><i>✦</i><i>✦</i><small>× 3 NHÓM</small></div><span>→</span><div className="stars-output"><b>★★★</b><small>3 SAO</small></div></div>
      <p className="pool-footnote">Số bản sao trong ví dụ có thể thay đổi theo bộ và phiên bản.</p>
    </div></div>
  </Backdrop>;
};

export const EconomyScene: React.FC = () => {
  const frame = useCurrentFrame();
  return <Backdrop scene={5}>
    <SectionHeading index={5} eyebrow="TIỀN CŨNG LÀ TÀI NGUYÊN" title="Roll bây giờ hay lấy lãi về sau?" detail="Mỗi lần đổi là 2 vàng; tích lũy giúp bạn giữ sức mua cho lượt sau." />
    <div className="economy-split">
      <div className="economy-panel economy-panel--spend"><div className="economy-panel-head"><span>01 / CHI NGAY</span><b>ROLL LIÊN TỤC</b></div><div className="spend-counter"><GoldCounter from={50} to={38} startFrame={16} duration={190} /><span className="spend-decrease">−2 · −2 · −2 · −2 · −2 · −2</span></div><div className="spend-shop-mini">{[1, 2, 3, 1, 2].map((n, i) => <div key={i} className="mini-slot" style={{'--mini-color': shopOdds.colors[n - 1]} as React.CSSProperties}><i>{i + 1}</i><span>{n}v</span></div>)}</div><p>Đội hình có thể mạnh lên ngay, nhưng bạn sẽ còn ít vàng hơn.</p><div className="economy-meter"><span>VÀNG CÒN LẠI</span><b>{Math.max(38, 50 - Math.min(12, Math.floor(frame / 16) * 2))}</b><i><em style={{width: `${Math.max(72, 100 - Math.floor(frame / 16) * 4)}%`}} /></i></div></div>
      <div className="economy-vs">ĐỐI<br/>CHIẾU</div>
      <div className="economy-panel economy-panel--save"><div className="economy-panel-head"><span>02 / TÍCH LŨY</span><b>GIỮ LỢI TỨC</b></div><div className="interest-hero"><GoldCounter from={50} /><div className="interest-pop" style={{opacity: interpolate(frame, [55, 82], [0, 1], {extrapolateRight: 'clamp'})}}>+5 <small>VÀNG LÃI</small></div></div><div className="interest-table">{interestTable.map((row, i) => <div className="interest-row" key={row.gold} style={{opacity: interpolate(frame - i * 7, [0, 12], [0.35, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><span>{row.gold} VÀNG</span><i /><b>+{row.interest}</b></div>)}</div><div className="interest-cap">GIỮ TỪ 50 VÀNG <b>→ +5 TỐI ĐA</b></div></div>
    </div>
    <div className="economy-warning"><span>!</span> MỐC 50 LÀ MỤC TIÊU, KHÔNG PHẢI LUẬT CỨNG.</div>
  </Backdrop>;
};

const StrategyCard: React.FC<{num: string; name: string; descriptor: string; color: string; children: React.ReactNode; frame: number}> = ({num, name, descriptor, color, children, frame}) => <div className="strategy-card" style={{'--strategy-color': color, opacity: interpolate(frame, [12, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: `0 ${interpolate(frame, [10, 42], [38, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`} as React.CSSProperties}><div className="strategy-card-number">{num}</div><div className="strategy-card-title">{name}</div><div className="strategy-card-desc">{descriptor}</div>{children}</div>;

export const StrategyScene: React.FC = () => {
  const frame = useCurrentFrame();
  return <Backdrop scene={6}>
    <SectionHeading index={6} eyebrow="BA CÁCH DÙNG VÀNG" title="Chọn nhịp roll theo tình thế" detail="Máu, đội hình, lượng vàng và tướng bị tranh đều làm thay đổi quyết định." />
    <div className="strategy-grid">
      <StrategyCard frame={frame} num="01" name="ROLL CHẬM" descriptor="Dùng phần vàng dư, giữ mốc lãi" color="#38D39F"><div className="strategy-level">CẤP 6 <span>·</span> TÌM TƯỚNG 1–3 VÀNG</div><div className="strategy-gold-track">{[56, 54, 52, 50].map((v, i) => <b key={v} style={{opacity: frame > 24 + i * 30 ? 1 : 0.3}}>{v}<small>v</small></b>)}</div><div className="strategy-slow-note">DỪNG Ở MỐC 50</div><div className="strategy-unit"><ChampionCard unit={{name: 'Linh', cost: 2}} index={0} frame={frame} stars={1} /><span>+1 BẢN SAO</span></div></StrategyCard>
      <StrategyCard frame={frame - 8} num="02" name="XẢ VÀNG" descriptor="Tiêu mạnh khi cần nâng cấp ngay" color="#EF6464"><div className="strategy-health"><span>MÁU</span><b>28</b><i><em style={{width: `${Math.max(15, 72 - frame / 6)}%`}} /></i></div><div className="strategy-board-strength"><div className="board-before"><span>TRƯỚC</span><b>2.4</b></div><div className="board-arrow">→</div><div className="board-after"><span>SAU NÂNG CẤP</span><b>{(2.4 + Math.min(2.1, Math.max(0, (frame - 30) / 90))).toFixed(1)}</b></div></div><div className="strategy-drops">{[42, 32, 22, 12].map((v, i) => <span key={v} style={{opacity: frame > 25 + i * 26 ? 1 : 0.25}}>{v}v</span>)}</div><div className="strategy-emphasis">ƯU TIÊN SỐNG SÓT</div></StrategyCard>
      <StrategyCard frame={frame - 16} num="03" name="LÊN 8 NHANH" descriptor="Lên cấp trước, roll tìm chủ lực" color="#51A6FF"><div className="xp-label"><span>KINH NGHIỆM</span><b>CẤP 7 <i>→</i> CẤP 8</b></div><div className="xp-track"><i style={{width: `${interpolate(frame, [20, 125], [22, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`}} /></div><div className="fast-eight-chart"><div><span>4 VÀNG</span><b>10%</b></div><i>→</i><div className="fast-eight-high"><span>4 VÀNG</span><b>30%</b></div></div><div className="strategy-emphasis">ROLL Ở CẤP 8</div></StrategyCard>
    </div>
    <div className="strategy-caveat">KHÔNG CÓ LỐI CHƠI NÀO LUÔN TỐI ƯU · TÙY VÁN ĐẤU</div>
  </Backdrop>;
};

const CircularMeter: React.FC<{value: number; label: string; color: string; frame: number}> = ({value, label, color, frame}) => {
  const shown = Math.round(interpolate(frame, [24, 85], [0, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const dash = 440;
  return <div className="prob-meter"><svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="70" className="prob-meter-track"/><circle cx="90" cy="90" r="70" className="prob-meter-value" style={{stroke: color, strokeDasharray: dash, strokeDashoffset: dash * (1 - shown / 100), transform: 'rotate(-90deg)', transformOrigin: '90px 90px'}} /></svg><div className="prob-meter-number">{shown}<small>%</small></div><div className="prob-meter-label">{label}</div></div>;
};

export const ProbabilityExampleScene: React.FC = () => {
  const frame = useCurrentFrame();
  return <Backdrop scene={7}>
    <SectionHeading index={7} eyebrow="NĂM Ô · MỖI Ô ĐỘC LẬP" title="Có tướng 4 vàng ≠ trúng chủ lực" detail="Minh họa xác suất có ít nhất một tướng bốn vàng trong năm ô." />
    <div className="probability-layout">
      <div className="prob-panel"><div className="prob-panel-title"><span>CẤP 7</span><b>10% <small>/ Ô</small></b></div><div className="prob-slots">{[0, 1, 2, 3, 4].map((i) => <div key={i} className={`prob-slot ${i === 3 ? 'prob-slot--hit' : ''}`} style={{'--slot-color': shopOdds.colors[3], opacity: interpolate(frame - i * 5, [0, 18], [0.35, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} as React.CSSProperties}>{i === 3 ? <ChampionCard unit={{name: 'Tâm', cost: 4}} index={3} frame={frame - 36} /> : <span>?</span>}</div>)}</div><div className="prob-meter-wrap"><CircularMeter value={level7FourCostFiveSlots * 100} label="ÍT NHẤT MỘT" color="#BF8BFF" frame={frame} /></div><div className="prob-equation"><b>P</b><span>=</span><small>1 − (1 − 0,10)<sup>5</sup></small></div></div>
      <div className="prob-vs">SO<br/>SÁNH</div>
      <div className="prob-panel prob-panel--bright"><div className="prob-panel-title"><span>CẤP 8</span><b>30% <small>/ Ô</small></b></div><div className="prob-slots">{[0, 1, 2, 3, 4].map((i) => <div key={i} className={`prob-slot ${i === 1 || i === 4 ? 'prob-slot--hit' : ''}`} style={{'--slot-color': shopOdds.colors[3], opacity: interpolate(frame - i * 5, [0, 18], [0.35, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} as React.CSSProperties}>{i === 1 || i === 4 ? <ChampionCard unit={{name: i === 1 ? 'Tâm' : 'An', cost: 4}} index={i} frame={frame - 30 + i * 4} /> : <span>?</span>}</div>)}</div><div className="prob-meter-wrap"><CircularMeter value={level8FourCostFiveSlots * 100} label="ÍT NHẤT MỘT" color="#F1C75B" frame={frame} /></div><div className="prob-equation"><b>P</b><span>=</span><small>1 − (1 − 0,30)<sup>5</sup></small></div></div>
    </div>
    <div className="prob-warning"><span>!</span> KHÔNG PHẢI XÁC SUẤT TÌM ĐÚNG MỘT TƯỚNG 4 VÀNG CỤ THỂ</div>
    <div className="prob-formula-note">GIẢ ĐỊNH: CÁC Ô ĐƯỢC RÚT ĐỘC LẬP · TỶ LỆ THAM KHẢO CẦN XÁC NHẬN THEO PATCH</div>
  </Backdrop>;
};

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  return <Backdrop scene={8}>
    <div className="summary-left"><div className="summary-eyebrow">TÓM TẮT CHIẾN THUẬT</div><h2>ROLL THÔNG<br/><em>MINH HƠN</em></h2><p>Hiểu xác suất — Quản lý vàng — Chọn đúng thời điểm</p><div className="summary-signoff">XÁC SUẤT KHÔNG HỨA HẸN KẾT QUẢ.<br/>NÓ GIÚP BẠN CHỌN CÁCH ĐÁNH.</div></div>
    <div className="summary-right"><div className="summary-rules"><RuleLine index={1}>Chọn đúng cấp để roll</RuleLine><RuleLine index={2} accent="#BF8BFF">Kiểm tra tướng bị tranh</RuleLine><RuleLine index={3} accent="#38D39F">Quản lý vàng và lợi tức</RuleLine><RuleLine index={4} accent="#EF6464">Biết lúc cần xả vàng</RuleLine></div><div className="summary-hero-card"><ChampionCard unit={{name: 'Linh', cost: 4}} index={2} frame={frame + 60} stars={3} highlighted /></div><div className="summary-orbit summary-orbit--one"/><div className="summary-orbit summary-orbit--two"/></div>
    <div className="summary-end-mark">HẾT HƯỚNG DẪN <span>◆</span> CHÚC BẠN ROLL CÓ KẾ HOẠCH</div>
  </Backdrop>;
};
