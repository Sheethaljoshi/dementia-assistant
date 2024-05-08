import React from 'react';

const Card: React.FC = () => {
  return (
<div className="collapse bg-base-200 m-10 ">
  <input type="checkbox" className="peer" /> 
  <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className='ml-3 rounded-xl w-50 mt-3 mb-3' />
  </div>
  <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
    <p>The entrance is marked by a rustic wooden gate adorned with winding ivy, a testament to the symbiosis between nature and humanity in this idyllic haven. Beyond the gate, a winding cobblestone path meanders through lush meadows and ancient trees, leading you deeper into the heart of this enchanting retreat.</p>
  </div>
</div>
  );
};

export default Card;



