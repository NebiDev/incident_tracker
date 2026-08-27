"use client";
import dynamic from 'next/dynamic'
import IncidentFormSkeleton from '../_components/IncidentFormSkeleton'



const IncidentForm = dynamic(() => import('../_components/IncidentForm'), { ssr: false,
	  loading: () => <IncidentFormSkeleton /> 
	

 });

const NewIncidentPage = () => {
  return (
	<div>
		<IncidentForm/>
	  
	</div>
  )
}

export default NewIncidentPage
