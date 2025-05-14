// --- File: src/Views/StepDetailPage.js ---// 
import React, { useEffect } from 'react'; 
import { useParams, Navigate } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async'; 
// import PropTypes from 'prop-types'; // FIXED: Removed as not used if data is local 
import './StepDetailPage.css'; 
// Data is defined locally for simplicity. 
const residentialStepsData = [ 
{ id: 'res_proc1', title: '1. Free Consultation & Initial Assessment', text: 'Our journey together begins with a friendly chat to understand your energy needs.', detailedText: 'During the initial consultation, we aim to understand your current energy usage, typical electricity bills, and your goals for going solar (e.g., bill reduction, load shedding backup, full energy independence). We may use satellite imagery for a preliminary roof assessment and discuss your property layout. An optional on-site visit can be scheduled if more detailed information is required to confirm suitability, roof condition, and potential shading issues. This step is crucial for us to gather the foundational data needed for a tailored proposal.' }, 
{ id: 'res_proc2', title: '2. Custom Solar Design & Transparent Quotation', text: 'We design a bespoke solar system and provide a clear, itemized quote.', detailedText: 'Our technical team uses the gathered data to design an optimal solar system for your home. This includes selecting the right number of solar panels, the appropriate inverter size, and the ideal battery capacity (if chosen) from reputable brands. The quotation you receive will be comprehensive, itemizing all equipment, installation labor, any additional electrical work, projected energy production, estimated savings, and available financing or payment options. We believe in full transparency with no hidden costs.' }, 
{ id: 'res_proc3', title: '3. Seamless, Professional Installation', text: 'Our certified technicians install your system efficiently and safely.', detailedText: 'Upon your approval, we schedule the installation at your convenience. Our in-house teams of certified and experienced solar installers will carry out the work with utmost professionalism and adherence to safety standards. We manage all necessary municipal applications and Eskom paperwork (SSEG applications). The physical installation usually takes 1 to 3 days for a standard residential system, with minimal disruption to your daily routine. We ensure a clean site post-installation.' }, 
{ id: 'res_proc4', title: '4. Activation, Monitoring & Ongoing Support', text: 'Start saving! We provide monitoring tools and long-term support.', detailedText: 'After installation and all regulatory approvals are complete, your system is commissioned and activated. You start generating your own clean energy immediately! We provide you with access to user-friendly monitoring software (often a mobile app) that allows you to track your system\'s performance, energy production, and consumption in real-time. SolPower is committed to your long-term satisfaction, offering dedicated after-sales support, system maintenance advice, and optional maintenance plans to ensure your solar investment performs optimally for years to come.' }, 
]; 
const commercialStepsData = [ 
{ id: 'com_proc1', title: '1. In-Depth Consultation & Energy Use Analysis', text: 'We start with a thorough consultation to understand your business\'s energy needs.', detailedText: 'For our commercial clients, the process begins with an in-depth consultation to fully understand your business operations, energy consumption patterns (including peak demand times), and specific energy goals (e.g., cost reduction, carbon footprint reduction, operational continuity during outages). A detailed analysis of at least 12 months of your Eskom electricity bills is crucial at this stage.' }, 
{ id: 'com_proc2', title: '2. On-Site Technical Assessment & System Engineering', text: 'Our engineers conduct a comprehensive on-site survey to design the optimal system.', detailedText: 'Following the initial consultation, our experienced solar engineers will conduct a thorough on-site technical assessment of your premises. This involves evaluating roof space suitability (or ground-mount options), structural integrity of buildings, existing electrical infrastructure, and potential shading factors. Based on this survey and your load profile, we engineer a custom commercial-grade solar system.' }, 
{ id: 'com_proc3', title: '3. Detailed Proposal, ROI & Finance/PPA Options', text: 'Receive a transparent proposal including specs, ROI, and finance options.', detailedText: 'We present you with a comprehensive proposal detailing the system size, choice of Tier-1 components, projected Return on Investment (ROI), long-term energy savings forecasts, and maintenance schedules. We also clearly outline available financial solutions, including outright purchase, asset finance, or a R0 capital outlay Solar PPA.' }, 
{ id: 'com_proc4', title: '4. Professional Installation, Grid Integration & Commissioning', text: 'Our accredited teams manage the entire process from procurement to activation.', detailedText: 'SolPower’s accredited installation teams manage the entire project lifecycle, from procurement and logistics to the safe and compliant installation of the solar system. We adhere strictly to all relevant SANS standards and electrical codes. Our team handles all necessary municipal approvals and Eskom grid integration requirements. Once installed, the system is rigorously tested and commissioned.' }, 
{ id: 'com_proc5', title: '5. Advanced Monitoring, Reporting & Proactive Maintenance', text: 'Benefit from advanced monitoring, reporting, and maintenance plans.', detailedText: 'After commissioning, your business gains access to advanced system monitoring platforms. These provide real-time insights into energy production, consumption, system health, and financial savings. We offer customizable reporting and proactive commercial solar maintenance plans to ensure your system operates at peak efficiency.' }, 
]; 
const StepDetailPage = () => { 
const { stepId } = useParams(); 
const combinedSteps = [...residentialStepsData, ...commercialStepsData]; 
const step = combinedSteps.find(s => s.id === stepId); 
useEffect(() => { 
window.scrollTo(0, 0); 
}, [stepId]); 
if (!step) { 
return <Navigate to="/404" replace />; 
} 
const titleMatch = step.title.match(/^\d+\.\s*(.*)/); 
const cleanTitle = titleMatch ? titleMatch[1].trim() : step.title.trim(); 
const pageTitle = `${cleanTitle} | SolPower Process Details`; 
const metaDescription = `Detailed information about: ${cleanTitle}. ${step.text.substring(0, 120)}...`; 
return ( 
<> 
<Helmet> 
<title>{pageTitle}</title> 
<meta name="description" content={metaDescription} /> 
</Helmet> 
<div className="step-detail-page-container"> 
<div className="step-detail-header"> 
<h1>{step.title}</h1> 
</div> 
<div className="step-detail-content"> 
{step.detailedText.split('\n').map((paragraph, index) => ( 
paragraph.trim() && <p key={index}>{paragraph}</p> 
))} 
</div> 
<div className="step-detail-footer"> 
<button onClick={() => window.close()} className="btn-solpower-secondary">Close Tab</button> 
</div> 
</div> 
</> 
); 
}; 
export default StepDetailPage;
