//--- File: src/Views/HowItWorks.js --- 
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async'; 
import { useInView } from 'react-intersection-observer'; 
// Import Shared Components 
import ProcessStepSlider from '../Components/ProcessStepSlider.js'; 
import StepDetailModal from '../Components/StepDetailModal.js'; 
import Button from '../Components/Button.js'; // Assuming you still need this, otherwise remove 
import ContactSectionCTA from '../Components/ContactSectionCTA.js'; 
import solarSavingsVideo from '../assets/video/Solar_Savings.mp4'; 
import './HowItWorks.css'; // Styles for this page 
// --- Reusable Animation Components --- 
const AnimatedPointComponent = React.forwardRef( 
({ children, className, tag: Tag = 'div', delay = 0, threshold = 0.1, triggerOnce = true, style: customStyle = {} }, ref) => { 
const { ref: intersectionRef, inView } = useInView({ triggerOnce, threshold, delay: triggerOnce ? delay * 1000 : undefined }); 
const setRefsInternal = (node) => { 
intersectionRef(node); 
if (ref && typeof ref === 'function') ref(node); 
else if (ref) ref.current = node; 
}; 
const combinedClassName = `${className || ''} fade-in-up ${inView ? 'visible' : ''}`; 
const finalStyle = { ...customStyle, transitionDelay: inView && !triggerOnce ? `${delay}s` : (triggerOnce && inView ? `${delay}s`: '0s') }; 
return <Tag ref={setRefsInternal} className={combinedClassName} style={finalStyle}>{children}</Tag>; 
} 
); 
const AnimatedHeadingComponent = ({ text, className = '', level = 'h2', id, threshold = 0.2, rootMargin = "0px 0px -50px 0px", triggerOnce = true }) => { 
const { ref, inView } = useInView({ triggerOnce, threshold, rootMargin }); 
const Tag = level; 
const combinedClassName = `${className || ''} ${inView ? 'heading-visible' : ''}`; 
return <Tag ref={ref} className={combinedClassName} id={id}><span className="underline-span">{text}</span></Tag>; 
}; 
// Component name is HowItWorksPage, filename is HowItWorks.js 
const HowItWorksPage = ({ paths = {} }) => { 
const [isModalOpen, setIsModalOpen] = useState(false); 
const [selectedStepForModal, setSelectedStepForModal] = useState(null); 
const handleOpenDetailModal = (step) => { 
setSelectedStepForModal(step); 
setIsModalOpen(true); 
}; 
const handleCloseDetailModal = () => { 
setIsModalOpen(false); 
setSelectedStepForModal(null); 
}; 
// --- UPDATED: Correct lottieSrc for res_proc2 --- 
const residentialSteps = [ 
{ id: 'res_proc1', title: '1. Free Consultation & Initial Assessment', text: 'Our journey together begins with a friendly chat to understand your energy needs.', detailedText: 'During the initial consultation, we aim to understand your current energy usage, typical electricity bills, and your goals for going solar (e.g., bill reduction, load shedding backup, full energy independence). We may use satellite imagery for a preliminary roof assessment and discuss your property layout. An optional on-site visit can be scheduled if more detailed information is required to confirm suitability, roof condition, and potential shading issues. This step is crucial for us to gather the foundational data needed for a tailored proposal.', lottieSrc: 'https://lottie.host/3d69bb92-40af-44dd-8cdf-2ebd6a47b358/8xJnvnKxz0.lottie' }, 
{ id: 'res_proc2', title: '2. Custom Solar Design & Transparent Quotation', text: 'We design a bespoke solar system and provide a clear, itemized quote.', detailedText: 'Our technical team uses the gathered data to design an optimal solar system for your home. This includes selecting the right number of solar panels, the appropriate inverter size, and the ideal battery capacity (if chosen) from reputable brands. The quotation you receive will be comprehensive, itemizing all equipment, installation labor, any additional electrical work, projected energy production, estimated savings, and available financing or payment options. We believe in full transparency with no hidden costs.', lottieSrc: 'https://lottie.host/4fc88005-c52d-455b-b7d3-a3dca270f44c/PAzRpijmYv.lottie' /* <-- CORRECT URL APPLIED HERE */ }, 
{ id: 'res_proc3', title: '3. Seamless, Professional Installation', text: 'Our certified technicians install your system efficiently and safely.', detailedText: 'Upon your approval, we schedule the installation at your convenience. Our in-house teams of certified and experienced solar installers will carry out the work with utmost professionalism and adherence to safety standards. We manage all necessary municipal applications and Eskom paperwork (SSEG applications). The physical installation usually takes 1 to 3 days for a standard residential system, with minimal disruption to your daily routine. We ensure a clean site post-installation.', lottieSrc: 'https://lottie.host/82f52b08-badb-42b6-b964-8f7275859716/zp8tFYNVA6.lottie' }, 
{ id: 'res_proc4', title: '4. Activation, Monitoring & Ongoing Support', text: 'Start saving! We provide monitoring tools and long-term support.', detailedText: 'After installation and all regulatory approvals are complete, your system is commissioned and activated. You start generating your own clean energy immediately! We provide you with access to user-friendly monitoring software (often a mobile app) that allows you to track your system\'s performance, energy production, and consumption in real-time. SolPower is committed to your long-term satisfaction, offering dedicated after-sales support, system maintenance advice, and optional maintenance plans to ensure your solar investment performs optimally for years to come.', lottieSrc: 'https://lottie.host/f6bd9ec3-682a-4082-a5fd-e94b80f53806/p9VcE7cAAA.lottie' }, 
]; 
// --- End of UPDATED section --- 
const commercialSteps = [ 
{ id: 'com_proc1', title: '1. In-Depth Consultation & Energy Use Analysis', text: 'We start with a thorough consultation to understand your business\'s energy needs.', detailedText: 'For our commercial clients, the process begins with an in-depth consultation to fully understand your business operations, energy consumption patterns (including peak demand times), and specific energy goals (e.g., cost reduction, carbon footprint reduction, operational continuity during outages). A detailed analysis of at least 12 months of your Eskom electricity bills is crucial at this stage.', lottieSrc: 'https://lottie.host/8e465cf6-68a5-4669-a520-2996e4c0e2fd/CsLy5258g2.lottie' }, 
{ id: 'com_proc2', title: '2. On-Site Technical Assessment & System Engineering', text: 'Our engineers conduct a comprehensive on-site survey to design the optimal system.', detailedText: 'Following the initial consultation, our experienced solar engineers will conduct a thorough on-site technical assessment of your premises. This involves evaluating roof space suitability (or ground-mount options), structural integrity of buildings, existing electrical infrastructure, and potential shading factors. Based on this survey and your load profile, we engineer a custom commercial-grade solar system.', lottieSrc: 'https://lottie.host/cd5df607-1341-489b-b08e-00a037e65364/mPKvZPuQYK.lottie' }, 
{ id: 'com_proc3', title: '3. Detailed Proposal, ROI & Finance/PPA Options', text: 'Receive a transparent proposal including specs, ROI, and finance options.', detailedText: 'We present you with a comprehensive proposal detailing the system size, choice of Tier-1 components, projected Return on Investment (ROI), long-term energy savings forecasts, and maintenance schedules. We also clearly outline available financial solutions, including outright purchase, asset finance, or a R0 capital outlay Solar PPA.', lottieSrc: 'https://lottie.host/7e00ff3f-3dbd-4bb2-8db9-5ee0c2de4cbe/daJ7rD6YsJ.lottie' }, 
{ id: 'com_proc4', title: '4. Professional Installation, Grid Integration & Commissioning', text: 'Our accredited teams manage the entire process from procurement to activation.', detailedText: 'SolPower’s accredited installation teams manage the entire project lifecycle, from procurement and logistics to the safe and compliant installation of the solar system. We adhere strictly to all relevant SANS standards and electrical codes. Our team handles all necessary municipal approvals and Eskom grid integration requirements. Once installed, the system is rigorously tested and commissioned.', lottieSrc: 'https://lottie.host/0f16e5fe-66a4-4ae4-8514-3bc544161319/womsi6W5BG.lottie' }, 
{ id: 'com_proc5', title: '5. Advanced Monitoring, Reporting & Proactive Maintenance', text: 'Benefit from advanced monitoring, reporting, and maintenance plans.', detailedText: 'After commissioning, your business gains access to advanced system monitoring platforms. These provide real-time insights into energy production, consumption, system health, and financial savings. We offer customizable reporting and proactive commercial solar maintenance plans to ensure your system operates at peak efficiency.', lottieSrc: 'https://lottie.host/4e16cbb0-a91c-48bf-a49e-1387f2da5bc3/saav7Tpd43.lottie' }, 
]; 
const pageTitle = "How Solar Works With SolPower | Our Process Explained"; 
const metaDescription = "Discover SolPower's simple, transparent process for residential and commercial solar panel installations."; 
const domain = "https://www.YOUR_DOMAIN.co.za"; // Replace YOUR_DOMAIN 
const canonicalUrl = domain + (paths?.howItWorks || '/how-it-works'); 
const webpageSchema = { "@context": "https://schema.org", "@type": "WebPage", "url": canonicalUrl, "name": pageTitle, "description": metaDescription, "publisher": { "@type": "Organization", "name": "SolPower", "logo": { "@type": "ImageObject", "url": `${domain}/logo.png` } } }; 
return ( 
<div className="page-wrapper how-it-works-page"> 
<Helmet> 
<title>{pageTitle}</title> 
<meta name="description" content={metaDescription} /> 
<link rel="canonical" href={canonicalUrl} /> 
<script type="application/ld+json">{JSON.stringify(webpageSchema)}</script> 
{/* Ensure Lottie player script is in your public/index.html */} 
</Helmet> 
<section className="how-it-works-intro-section with-video-bg"> 
<video autoPlay loop muted playsInline className="background-video"> 
<source src={solarSavingsVideo} type="video/mp4" /> 
Your browser does not support the video tag. 
</video> 
<div className="video-overlay"></div> 
<div className="page-container-inner"> 
<AnimatedHeadingComponent text="Your Journey to Energy Independence: Simplified" level="h1" className="how-it-works-page-title" triggerOnce={true}/> 
<AnimatedPointComponent className="how-it-works-page-subtitle" tag="p" delay={0.2} triggerOnce={true}> 
At SolPower, we believe switching to solar should be a clear, straightforward, and rewarding experience. We've refined our process to guide you seamlessly from initial curiosity to enjoying sustainable energy and significant savings. 
</AnimatedPointComponent> 
</div> 
</section> 
{/* Residential Section */} 
<section className="how-it-works-process-section residential-section section-green-natural-bg"> 
<div className="page-container-inner"> 
<AnimatedHeadingComponent text="How It Works: For Your Home" level="h2" className="how-it-works-section-heading" triggerOnce={true}/> 
<AnimatedPointComponent tag="p" className="section-intro-p" delay={0.1} triggerOnce={true}> 
Transform your home into an energy-efficient haven with our tailored residential solar solutions. Explore our step-by-step approach below: 
</AnimatedPointComponent> 
<ProcessStepSlider 
steps={residentialSteps} // Passed updated steps array 
idPrefix="res" 
defaultStepIndex={0} 
onCardReadMore={handleOpenDetailModal} 
/> 
</div> 
</section> 
<section className="interstitial-lottie-section"> 
<div className="page-container-inner"> 
<AnimatedPointComponent className="standalone-lottie-wrapper" delay={0.1} triggerOnce={true} tag="div"> 
<div className="intro-lottie-animation-wrapper"> 
<dotlottie-player 
src="https://lottie.host/d5023c9d-afaf-48c8-a796-faaf1c8acb65/s7v5WkXMmE.lottie" 
background="transparent" speed="1" loop autoplay 
aria-label="Animated visual representing solar process transition" 
></dotlottie-player> 
</div> 
</AnimatedPointComponent> 
</div> 
</section> 
{/* Commercial Section */} 
<section className="how-it-works-process-section commercial-section section-dark-bg"> 
<div className="page-container-inner"> 
<AnimatedHeadingComponent text="How It Works: For Your Business" level="h2" className="how-it-works-section-heading" triggerOnce={true}/> 
<AnimatedPointComponent tag="p" className="section-intro-p" delay={0.1} triggerOnce={true}> 
Power your business towards greater efficiency and sustainability. Our commercial solar process is designed for maximum impact and minimal disruption. Explore the steps: 
</AnimatedPointComponent> 
<ProcessStepSlider 
steps={commercialSteps} 
idPrefix="com" 
defaultStepIndex={0} 
onCardReadMore={handleOpenDetailModal} 
/> 
</div> 
</section> 
<ContactSectionCTA 
title="Ready to Start Your Solar Journey?" 
text="Take the first step towards energy independence. Contact us today!" 
buttonText="Get Your Free Consultation" 
buttonLink={paths?.contact} 
/> 
{isModalOpen && selectedStepForModal && ( 
<StepDetailModal 
isOpen={isModalOpen} 
onClose={handleCloseDetailModal} 
title={selectedStepForModal.title.match(/^\d+\.\s*(.*)/) ? selectedStepForModal.title.match(/^\d+\.\s*(.*)/)[1].trim() : selectedStepForModal.title.trim()} 
> 
{typeof selectedStepForModal.detailedText === 'string' ? 
selectedStepForModal.detailedText.split('\n').map((paragraph, index) => ( 
paragraph.trim() && <p key={index}>{paragraph}</p> 
)) : <p>{selectedStepForModal.detailedText}</p> 
} 
</StepDetailModal> 
)} 
</div> 
); 
}; 
export default HowItWorksPage;
