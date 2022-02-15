import SidebarComp from './SidebarComp';
import Image from 'next/image';
import placeholder from 'public/assets/images/placeholder.jpg';

const Sidebar = () => {
  return (
    <SidebarComp>
      <div className="sidebar">
        <Image src={placeholder} alt="" width={400} height={270} />
      </div>

      <div className="not-sidebar">
        Lick sellotape meow to be let out, kitty pounce, trip, faceplant you
        didn&apos;t see that no you didn&apos;t definitely didn&apos;t lick,
        lick, lick, and preen away the embarrassment and have secret plans is
        good you understand your place in my world for eat a plant, kill a hand
        so i show my fluffy belly but it&apos;s a trap! if you pet it i will
        tear up your hand. Kitten is playing with dead mouse find empty spot in
        cupboard and sleep all day, but roll over and sun my belly demand to
        have some of whatever the human is cooking, then sniff the offering and
        walk away jump up to edge of bath, fall in then scramble in a mad panic
        to get out groom forever, stretch tongue and leave it slightly out,
        blep. I rule on my back you rub my tummy i bite you hard rub whiskers
        on bare skin act innocent lasers are tiny mice swat turds around the
        house being gorgeous with belly side up jump on fridge. Sit on human
        they not getting up ever break lamps and curl up into a ball meow and
        walk away always hungry so hit you unexpectedly, but bleghbleghvomit my
        furball really tie the room together. Meow flop over ask for petting.
      </div>
    </SidebarComp>
  );
};

export default Sidebar;
