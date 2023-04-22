export default function Home(props: any) {
  return (
    <main>
      <h1>{props?.data?.title}</h1>
      <p>{props?.data?.description}</p>
    </main>
  );
}

const getAllPages = () => {
  return [
    {
      slug: "alumnos",
      breadcrumbLabel: "Alumnos",
      data: {
        title: "Alumnos",
        description: "Ésta es la página de Alumnos",
      },
    },
    {
      slug: "extension-universitaria",
      breadcrumbLabel: "Extensión Universitaria",
      data: {
        title: "Extensión Universitaria",
        description: "Ésta es la página de Conexión Educativa",
      },
    },
    {
      slug: "voz-uane/blog",
      breadcrumbLabel: "Blog",
      data: {
        title: "Voz UANE",
        description: "Éste es el blog de Voz UANE",
      },
    },
    {
      slug: "nivel1/nivel2/nivel3/nivel4",
      breadcrumbLabel: "Anidado",
      data: {
        title: "Página anidada",
        description: "Esta página tiene 4 niveles de anidación",
        sections: [
          {
            type: "Banner",
            data: {
              text: "wey ya :c"
            }
          }
        ]
      },
    },
    {
      slug: "oferta-educativa",
      data: {
        title: "Yo había ponido mi nota aquí..."
      },
    },
    {
      slug: "oferta-educativa/prueba-hector/todo-quieres",
      data: {
        title: "Oferta Educativa",
        description: "Quiero un pastel de chocolate",
      },
    },
    {
      slug: "/SIAAF/",
      data: {
        title: "SIAAF",
        description: "Ésta es la página del SIAAF",
      },
    },
  ];
};

const normalizePath = (path: string) => path?.replace(/(^\/+|\/+$)/mg, "");

export async function getStaticPaths() {
  const pages = getAllPages();

  return {
    //https://stackoverflow.com/questions/19134860/javascript-remove-strings-in-beginning-and-end
    paths: pages?.map((page) => ({ params: { slug: normalizePath(page?.slug)?.split("/") } })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const {
    params: { slug },
  } = context;
  const route = slug?.join("/");

  const pages = getAllPages();
  const pageData = pages?.find((page) => normalizePath(page?.slug) === route);

  return {
    // Passed to the page component as props
    props: { ...pageData },
  };
}
