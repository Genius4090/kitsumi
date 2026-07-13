<script lang="ts" setup>


interface AboutType {
    id:number,
    title:string,
    content:string,
    contentExtra?:string
}


const aboutList:AboutType[] = [
    {
        id:1,
        title: "Unveiling Culinary Artistry: A Journey into kitsumi's Soul",
        content: "In a world where dining experiences often blend into the ordinary, Kitsumi stands as an emblem of culinary passion redefined. Beyond being a restaurant that serves sushi, Kitsumi is an embodiment of dedication, creativity, and a profound love for the art of gastronomy. As you step through its doors, you're not merely entering an eatery; you're immersing yourself in an experience that goes beyond the boundaries of a traditional dining encounter."
    },
    {
        id:2,
        title: "Crafting a Feast for the Senses",
        content: "The heart of Kitsumi's allure lies in its meticulous attention to every detail, from the selection of ingredients to the presentation of each dish. While renowned for its exceptional sushi, Kitsumi's passion for perfection extends to every facet of the culinary journey. The talented chefs curate a symphony of flavors, seamlessly blending textures, colors, and aromas to create a multisensory masterpiece.",
        contentExtra: "The ambiance itself speaks of a story where modern elegance meets warmth, inviting patrons to relish not only the food but also the atmosphere that envelopes them. Each dish that graces the table is not just a meal; it's a tale told through taste—a testament to the tireless commitment Kitsumi has toward crafting an experience that resonates with food enthusiasts and connoisseurs alike."
    },
    {
        id:3,
        title: "Beyond Sushi: Nurturing Connections",
        content: "While the gastronomic delights are undoubtedly the centerpiece, Kitsumi goes beyond being a culinary haven. It's a place that fosters connections, where conversations flow as smoothly as the sake, and moments turn into cherished memories. The passionate team at Kitsumi believes that dining is an act of bonding—a chance to share joy, laughter, and stories over a beautifully laid table.",
        contentExtra: "The Kitsumi experience transcends the physical walls of the restaurant. It's an invitation to step out of the ordinary and into a world where passion for food is an art, and every guest is a cherished canvas. Through the symphony of flavors, the artistry of presentation, and the warmth of connection, Kitsumi invites you to witness passion personified in every aspect of your dining journey."
    }
]
</script>

<template>
<section class="my-20 md:my-40 px-4 sm:px-6 flex flex-col items-center justify-center">
    <HeadlineAlt>24th aug 2023</HeadlineAlt>
    <h2 class="max-w-[700px] mt-6 text-center uppercase text-3xl sm:text-5xl md:text-6xl font-forum">How <span class="text-pinkish">kitsumi</span> Redefines Flavor Harmony in Every Bite</h2>
    <HeadingIcon class="my-4"/>
    <div v-for="item in aboutList" :key="item.id" class="max-w-[732px] mt-20">
        <h4 class="text-2xl md:text-[32px] font-forum uppercase">{{ item.title }}</h4>
        <p class="text-textish/50 font-light leading-relaxed mt-4">{{ item.content }}</p>
        <p v-if="item.contentExtra" class="text-textish/50 font-light leading-relaxed mt-4">{{ item.contentExtra }}</p>
    </div>
</section>
</template>
