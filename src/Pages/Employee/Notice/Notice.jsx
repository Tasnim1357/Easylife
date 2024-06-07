import React from 'react';

const Notice = () => {
    return (
        <div className='mt-24'>

            <h1 className='text-5xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>Notices</h1>

<div className="collapse bg-yellow-200/40">
  <input type="radio" name="my-accordion-1" defaultChecked /> 
  <div className="collapse-title text-xl font-semibold ">
  Exciting Company Expansion!
  </div>
  <div className="collapse-content"> 
    <p>We are thrilled to announce that our company is expanding its operations to three new cities! This growth will provide us with more opportunities and allow us to serve our customers better. Stay tuned for more details and how this expansion might impact you.</p>
  </div>
</div>
<div className="collapse bg-yellow-200/40">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-xl  font-semibold">
  Important Health and Safety Reminder
  </div>
  <div className="collapse-content"> 
    <p>Your safety is our priority. Please remember to follow all health and safety guidelines, including wearing appropriate PPE, maintaining social distancing, and regularly sanitizing your hands. Let’s keep our workplace safe for everyone.</p>
  </div>
</div>
<div className="collapse bg-yellow-200/40">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-xl  font-semibold">
  Updated Remote Work Policy
  </div>
  <div className="collapse-content"> 
    <p>Effective July 1st, we will be implementing a new remote work policy. Employees will have the option to work from home two days a week. Please review the updated policy on the company intranet for more details.</p>
  </div>
</div>
<div className="collapse bg-yellow-200/40">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-xl  font-semibold">
  New Training Program - Enhance Your Skills!
  </div>
  <div className="collapse-content"> 
    <p>We are pleased to announce a new training program aimed at enhancing your skills in project management and leadership. The program starts on August 1st. Interested employees can register through the HR portal.</p>
  </div>
</div>
<div className="collapse bg-yellow-200/40">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-xl  font-semibold">
  Employee of the Month - Congratulations Sarah!
  </div>
  <div className="collapse-content"> 
    <p>Join us in congratulating Sarah Thompson for being named Employee of the Month! Sarahs dedication and hard work have significantly contributed to our teams success. Keep up the great work, Sarah!

</p>
  </div>
</div>
<div className="collapse bg-yellow-200/40">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-xl  font-semibold">
  Scheduled IT System Maintenance
  </div>
  <div className="collapse-content"> 
    <p>Please be aware that there will be scheduled maintenance on our IT systems this Friday from 10 PM to 2 AM. During this time, certain services may be unavailable. We apologize for any inconvenience this may cause.</p>
  </div>
</div>
            
        </div>
    );
};

export default Notice;