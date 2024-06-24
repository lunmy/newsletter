<template>
  <div class="bg-slate-700 d-flex">
    <img src="@/public/img/logo.svg" alt="" />

    <span class="d-flex align-center mx-auto">
      <p class="text-white">Marques</p>
      <p class="m-4 text-white">/</p>
      <p class="text-white">NewsLetters</p>
    </span>
  </div>
  <div class="container mx-auto p-10 grid grid-cols-6 gap-6">
    <brandCard v-for="company in companiesList" />

    <!-- <brandCard _imageSrc="/img/auchan.svg" _campaignX="12" _newsX="64" />
    <brandCard _imageSrc="/img/courir.svg" />
    <brandCard _imageSrc="/img/courtepaille.svg" />
    <brandCard _imageSrc="/img/dps.svg" />
    <brandCard _imageSrc="/img/macsf.svg" />
    <brandCard _imageSrc="/img/parcAsterix.svg" />
    <brandCard _imageSrc="/img/sakara.svg" />
    <brandCard _imageSrc="/img/sakara.svg" />
    <brandCard _imageSrc="/img/sakara.svg" /> -->
  </div>
</template>

<script setup>
import brandCard from "~/components/C-BrandCard.vue";

definePageMeta({
  middleware: ["auth"],
});

async function getCompagnies() {
  try {
    const json =
      "{\n" +
      '    "@context": "/contexts/Company",\n' +
      '    "@id": "/companies",\n' +
      '    "@type": "hydra:Collection",\n' +
      '    "hydra:totalItems": 30,\n' +
      '    "hydra:member": [\n' +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a85-79be-92eb-302d081d1dda",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Veniam neque omnis dolor qui.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a85-79be-92eb-302d081d1dda/image/0190497e-4a49-78fe-bf4b-039a1924b40b"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4aa8-7fd0-b951-8e48d2506fc5",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Dolores illum nulla rerum eaque qui consectetur.",\n' +
      '                    "company": "/companies/0190497e-4a85-79be-92eb-302d081d1dda",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4aa8-7fd0-b951-8e48d1622d10"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4aa8-7fd0-b951-8e48d2506fc5/image/0190497e-4a4a-7085-8b04-56c7d1c75b17"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd8-62be-a727-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1a-6e52-86cd-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a86-7fc3-a222-13ebebf2070b",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Odit excepturi accusamus vel quae.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a86-7fc3-a222-13ebebf2070b/image/0190497e-4a49-78fe-bf4b-039a19a3b2f8"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4aaa-7193-bd6b-efe08e97edb7",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Quidem ut quo dolor nobis.",\n' +
      '                    "company": "/companies/0190497e-4a86-7fc3-a222-13ebebf2070b",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4aaa-7193-bd6b-efe08dc93026"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4aaa-7193-bd6b-efe08e97edb7/image/0190497e-4a4a-7085-8b04-56c7d1d2b7d9"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd8-64c6-9ada-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-600a-b577-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a87-7461-881c-1f2f62867311",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Est tempora qui minus officia.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a87-7461-881c-1f2f62867311/image/0190497e-4a49-78fe-bf4b-039a1a02ae33"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4aac-70a7-b4c2-0d420c904ed7",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Dolores vitae aut quis magnam magnam nihil.",\n' +
      '                    "company": "/companies/0190497e-4a87-7461-881c-1f2f62867311",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4aac-70a7-b4c2-0d420bc4288e"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4aac-70a7-b4c2-0d420c904ed7/image/0190497e-4a4a-7085-8b04-56c7d1e1f9ab"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd8-67aa-a109-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-61c2-a3cd-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a88-73e5-a9a0-43dc154321a5",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Molestiae aliquam officiis soluta aliquam saepe.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a88-73e5-a9a0-43dc154321a5/image/0190497e-4a49-78fe-bf4b-039a1aa7007a"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4aae-71d4-8082-366edb573214",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Mollitia rerum est quod eum quo fugiat.",\n' +
      '                    "company": "/companies/0190497e-4a88-73e5-a9a0-43dc154321a5",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4aad-737d-9f8f-65863eded221"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4aae-71d4-8082-366edb573214/image/0190497e-4a4a-7085-8b04-56c7d2836bdd"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd8-69e4-9ed6-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-6384-8bc4-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a89-7ffb-bc98-c055f32fa2f2",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Accusantium exercitationem animi qui.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a89-7ffb-bc98-c055f32fa2f2/image/0190497e-4a49-78fe-bf4b-039a1abef282"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4aaf-7578-9d7b-88c53fc28b4c",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Sequi nam iusto officia quia.",\n' +
      '                    "company": "/companies/0190497e-4a89-7ffb-bc98-c055f32fa2f2",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4aaf-7578-9d7b-88c53fae77a1"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4aaf-7578-9d7b-88c53fc28b4c/image/0190497e-4a4a-7085-8b04-56c7d33ae271"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd8-6bf6-bec0-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-6546-8cc1-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a8a-7742-85cd-e08f65050cbe",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Vero voluptates fugit officiis explicabo.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a8a-7742-85cd-e08f65050cbe/image/0190497e-4a49-78fe-bf4b-039a1b800036"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4ab0-714f-bd43-788745629d6e",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Magnam beatae accusantium architecto et tempore.",\n' +
      '                    "company": "/companies/0190497e-4a8a-7742-85cd-e08f65050cbe",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4ab0-714f-bd43-788745370bd4"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4ab0-714f-bd43-788745629d6e/image/0190497e-4a4a-7085-8b04-56c7d347e048"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd8-6e08-a424-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-66fe-a906-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a8c-728d-bf21-73688eadf3bd",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Neque pariatur vel laudantium et laborum veniam.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a8c-728d-bf21-73688eadf3bd/image/0190497e-4a49-78fe-bf4b-039a1b86d024"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4ab2-72a0-93de-d29e0a6a5470",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Consequatur sequi rem reprehenderit.",\n' +
      '                    "company": "/companies/0190497e-4a8c-728d-bf21-73688eadf3bd",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4ab2-72a0-93de-d29e09b2f1eb"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4ab2-72a0-93de-d29e0a6a5470/image/0190497e-4a4a-7085-8b04-56c7d37e48dd"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd9-6010-bb33-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-68c0-9da9-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a8d-7061-a930-be67a0b7a76e",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Et non quos quia repellat expedita.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a8d-7061-a930-be67a0b7a76e/image/0190497e-4a49-78fe-bf4b-039a1c7651b0"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4ab3-7049-a46c-6cf5f06e62d5",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Provident rerum eum sint eos minima.",\n' +
      '                    "company": "/companies/0190497e-4a8d-7061-a930-be67a0b7a76e",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4ab3-7049-a46c-6cf5ef8ff982"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4ab3-7049-a46c-6cf5f06e62d5/image/0190497e-4a4a-7085-8b04-56c7d406ab3b"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd9-620e-b8e1-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-6a82-95a1-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/0190497e-4a8e-762e-b6f4-b08c4227f5b0",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Officia nihil quidem vel doloremque modi est qui.",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/0190497e-4a8e-762e-b6f4-b08c4227f5b0/image/0190497e-4a49-78fe-bf4b-039a1d282739"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/0190497e-4ab5-7211-93b5-8affebf7bc89",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Quidem corrupti qui magni ex.",\n' +
      '                    "company": "/companies/0190497e-4a8e-762e-b6f4-b08c4227f5b0",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/0190497e-4ab4-7327-8eda-b9ee0dca8a46"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/0190497e-4ab5-7211-93b5-8affebf7bc89/image/0190497e-4a4a-7085-8b04-56c7d4eee762"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef3208e-8cd9-6416-8b0c-579be2252644"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d1b-6c4e-a206-579be2252644"\n' +
      "            ]\n" +
      "        },\n" +
      "        {\n" +
      '            "@id": "/companies/1ef2ec43-0748-61f0-813f-07d8b5f1af4f",\n' +
      '            "@type": "Company",\n' +
      '            "name": "Courir",\n' +
      '            "images": [\n' +
      '                "https://local.api-samarkand.fr/companies/1ef2ec43-0748-61f0-813f-07d8b5f1af4f/image/0190343f-a116-76e7-916e-ef9e47441c0b"\n' +
      "            ],\n" +
      '            "campaigns": [\n' +
      "                {\n" +
      '                    "@id": "/campaigns/1ef2ec43-0748-61f0-813f-07d8b5f1af4e",\n' +
      '                    "@type": "Campaign",\n' +
      '                    "name": "Emails décembre 2023",\n' +
      '                    "company": "/companies/1ef2ec43-0748-61f0-813f-07d8b5f1af4f",\n' +
      '                    "newsletters": [\n' +
      '                        "/newsletters/019035f7-8850-705d-9875-09217aba2eee",\n' +
      '                        "/newsletters/0190497e-4a97-7d0e-bc4e-2be4606e0d43",\n' +
      '                        "/newsletters/0190497e-4a98-747b-8cd5-c5021ccdc538",\n' +
      '                        "/newsletters/0190497e-4a98-747b-8cd5-c5021d81c6c2",\n' +
      '                        "/newsletters/0190497e-4a98-747b-8cd5-c5021e3d1546",\n' +
      '                        "/newsletters/0190497e-4a99-7cbf-be6a-4024f380d15d",\n' +
      '                        "/newsletters/0190497e-4a99-7cbf-be6a-4024f460be7a",\n' +
      '                        "/newsletters/0190497e-4a9a-797a-8fd5-807c6a4d770d",\n' +
      '                        "/newsletters/0190497e-4a9a-797a-8fd5-807c6ac47896",\n' +
      '                        "/newsletters/0190497e-4a9b-7087-b1c2-0ebd8afb4cee",\n' +
      '                        "/newsletters/0190497e-4a9b-7087-b1c2-0ebd8b49e896",\n' +
      '                        "/newsletters/0190497e-4a9b-7087-b1c2-0ebd8c3b94af",\n' +
      '                        "/newsletters/0190497e-4a9c-7edc-905e-08d271eb91a9",\n' +
      '                        "/newsletters/0190497e-4a9c-7edc-905e-08d2720c1f01",\n' +
      '                        "/newsletters/0190497e-4a9d-7f15-9fd7-b834f468852c"\n' +
      "                    ],\n" +
      '                    "images": [\n' +
      '                        "https://local.api-samarkand.fr/campaigns/1ef2ec43-0748-61f0-813f-07d8b5f1af4e/image/019035ba-4f8c-7350-bbda-be10d78bb419"\n' +
      "                    ]\n" +
      "                }\n" +
      "            ],\n" +
      '            "templates": [\n' +
      '                "/templates/1ef31e9e-970a-6954-bf4e-e7b4a4a5be9b"\n' +
      "            ],\n" +
      '            "blocks": [\n' +
      '                "/blocks/1ef3208e-8d14-662e-bb66-579be2252644",\n' +
      '                "/blocks/1ef3208e-8d0f-6aac-b095-579be2252644",\n' +
      '                "/blocks/1ef3208e-8d0b-63ee-bc24-579be2252644",\n' +
      '                "/blocks/1ef3208e-8cda-6b90-afc2-579be2252644",\n' +
      '                "/blocks/1ef31ef1-407b-6a72-bda2-8925f3930fc8"\n' +
      "            ]\n" +
      "        }\n" +
      "    ],\n" +
      '    "hydra:view": {\n' +
      '        "@id": "/companies?groups%5B%5D=company%3Adetails&groups%5B%5D=campaign%3Aread&page=2",\n' +
      '        "@type": "hydra:PartialCollectionView",\n' +
      '        "hydra:first": "/companies?groups%5B%5D=company%3Adetails&groups%5B%5D=campaign%3Aread&page=1",\n' +
      '        "hydra:last": "/companies?groups%5B%5D=company%3Adetails&groups%5B%5D=campaign%3Aread&page=2",\n' +
      '        "hydra:previous": "/companies?groups%5B%5D=company%3Adetails&groups%5B%5D=campaign%3Aread&page=1"\n' +
      "    },\n" +
      '    "hydra:search": {\n' +
      '        "@type": "hydra:IriTemplate",\n' +
      '        "hydra:template": "/companies{?groups[]}",\n' +
      '        "hydra:variableRepresentation": "BasicRepresentation",\n' +
      '        "hydra:mapping": [\n' +
      "            {\n" +
      '                "@type": "IriTemplateMapping",\n' +
      '                "variable": "groups[]",\n' +
      '                "property": null,\n' +
      '                "required": false\n' +
      "            }\n" +
      "        ]\n" +
      "    }\n" +
      "}";

    const data = JSON.parse(json);

    const compagniesList = ref(data["hydra:member"]);
    // compagniesList.forEach((company) => {
    //   const id = company["@id"];
    //   // name
    //   const name = company["name"];
    //   // logo path
    //   const logoPath = company["images"][0];
    //   // number of campaign by company
    //   const totalCampaign = company["campaigns"].length;
    //   company["campaigns"].forEach((campaign) => {
    //     const totalNews = campaign["newsletters"].length;
    //   });
    // });
  } catch (error) {
    console.log("Error fetching data");
  }
}

getCompagnies();
</script>
