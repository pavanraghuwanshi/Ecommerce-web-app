
const Loader = () => {
  return (
    <div>
      loading
    </div>
  )
}

export default Loader;


 interface SkeletonProps{

  width?:string;
  length?:number;
}


export const  Skeleton = ({width="unset", length = 3}: SkeletonProps)=>{

//  const Skeletions:any = Array.from({length}, (_,idx)=>{    
  
//             <div key={idx} className="skeleton-shape ">Error</div>

// })

  return (
  <>
  <div className="skeleton-loader " style={{width}}>

  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
  <div className="skeleton-shape "> </div>
        {/* {Skeletions}     */}
  </div>
  </>)
};
