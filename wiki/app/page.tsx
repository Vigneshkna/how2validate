import { How2validate } from "@/components/how2validate";
import ReadmePage from "@/components/readme";

export default async function Home() {
  // const baseUrl = 'http://localhost:3000/api/getServices';
  // const provider = 'node';
  // const url = `${baseUrl}?provider=${provider}`;
  // console.log(url);
  
  // let services = await fetch(url.replace('/?','?')).then((res) =>
  //   res.json()
  // );

  // let services = await fetch('https://how2validate.vercel.app/api/getServices?provider:npm').then((res) =>
  //   res.json()
  // );
  // fetchProvider();
  // let data = []

  return (
    <>
      {/* <div>{JSON.stringify(services)}</div> */}
      {/* <ReadmePage></ReadmePage> */}
      <How2validate/>
    </>
  );
}
