import { Badge } from "@chakra-ui/react";

export function Toast(props) {
  let isMobile;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;
  } else {
    isMobile = false;
  }

  let toast = props.toast;

  let color =
    props.status == "success"
      ? "green"
      : props.status == "error"
      ? "red"
      : "blue";
  let title = props.title;
  let position = "top"

  toast({
    position: position,
    duration: 2000,
    isClosable: true,
    render: () => (
      <div
        className={`p-1 px1 ${
          position == "top-right" ? "mt-24" : "mt-4"
        }  rounded-full bg-white shadow-md flex relative items-center pr-8`}
      >
       
       {
        props.status_code ?
        <span className="absolute -right-4 font-bold" ><Badge bg={`${color}.100`} py='2' px='2' rounded='full' color={`${color}.700`}  >{props.status_code}</Badge></span>
        : ''
       }

        <div
          className={` h-12 w-12  flex items-center justify-center rounded-full bg-${color}-50`}
        >

          <span
            className={`font-bold text-3xl flex items-center justify-center text-${color}-600`}
          >
            { props.status == "success" ? (
              <ion-icon name="checkmark-circle"></ion-icon>
            ) : props.status == "error" ? (
              <ion-icon name="alert-circle"></ion-icon>
            ) : props.status == "loading" ? (
              <ion-icon name="refresh-outline"></ion-icon>
            ) : (
              <ion-icon name="information-circle"></ion-icon>
            )}
          </span>
        </div>
        <div className="ml-3  flex flex-col justify-center">
          {props.description ? (
            <span className="font-bold text-sm text-slate-400">
              {props.description}
            </span>
          ) : (
            ""
          )}

          <span className={`font-bold text-md text-${color}-600`}>
            {title}
          </span>
        </div>
      </div>
    ),
  });
}
