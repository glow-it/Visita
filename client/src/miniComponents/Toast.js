

export function Toast(props) {

    let toast = props.toast

    let color = props.status == "success" ? 'green' : props.status == "error" ? 'red' : 'blue'
    let title = props.title
    let position = props.postition

    toast({
        position: position,
        duration: 2000,
        isClosable : true,
        render: () => (
          <div className='p-1 px1 mt-6 rounded-full bg-white shadow-md flex items-center' >
           <div className={`h-12 w-12 flex items-center justify-center rounded-full bg-${color}-50`}>

            <span className={`text-3xl flex items-center justify-center text-${color}-600`}>
                {
                    props.status == "success" ?
                    <ion-icon name="checkmark-circle"></ion-icon>
                    :  props.status == "error" ?
                    <ion-icon name="alert-circle"></ion-icon>
                    :  props.status == "uploading" ?
                    <ion-icon name="arrow-down-circle"></ion-icon>
                    :<ion-icon name="information-circle"></ion-icon>
                }
            
            </span>


           </div>
            <div className="ml-3  flex flex-col justify-center">

                {
                    props.description ?
                    <span className="font-visita-bold text-sm text-slate-400">{props.description}</span>
                    : ''

                }

           

            <span className={`font-visita-bold text-md text-${color}-600`}>{title}</span>

            </div>
          </div>
        ),
      })

    

} 

