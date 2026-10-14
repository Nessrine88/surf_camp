import { NextPage } from 'next'
import SignupForm from '../_components/Events/SignupForm'

interface Props {}
const infoText= (
    <>
    <p className='copy'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati reiciendis officiis reprehenderit tenetur, earum dolorem suscipit nulla id consequuntur deleniti veniam inventore magni esse molestias voluptatem cupiditate ab autem.
    </p>
    <p className='copy'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati reiciendis officiis reprehenderit tenetur, earum dolorem suscipit nulla id consequuntur deleniti veniam inventore magni esse molestias voluptatem cupiditate ab autem.
    </p>
    <p className='copy'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati reiciendis officiis reprehenderit tenetur, earum dolorem suscipit nulla id consequuntur deleniti veniam inventore magni esse molestias voluptatem cupiditate ab autem.
    </p>
    </>
);
const headline = "You want to stay tuned for our events"
const Page = () => {
  return <main className='events-page'>
    <SignupForm infoText={infoText} headline={headline} />
  </main>
}

export default Page