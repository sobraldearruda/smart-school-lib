import { Author } from "../../models/author";

export async function AuthorSeeder() {
  console.log("Seeding Authors...");
  await Author.destroy({ where: {} });
  await Author.bulkCreate([
    { authorName: "Machado de Assis", 
      authorBiography: "A Brazilian writer, poet, playwright, and literary critic, Machado de Assis is considered one of the greatest writers in Brazilian literature." 
    },
    { authorName: "Clarice Lispector",
      authorBiography: "A Brazilian novelist and short story writer acclaimed internationally for her innovative novels and short stories, Clarice Lispector is a key figure in Brazilian literature."
    },
    { authorName: "Conceição Evaristo",
      authorBiography: "A Brazilian writer and activist, Conceição Evaristo's work often explores themes of race, class, gender, and identity in Brazil."
    },
  ]);
  console.log("Authors seeded.");
}
