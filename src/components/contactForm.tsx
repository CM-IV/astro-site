import { createSignal, createResource, Show } from "solid-js";


async function postFormData(formData: FormData) {
  const response = await fetch("/api/feedback", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}


const ContactForm = () => {

  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setFormData(new FormData(e.target as HTMLFormElement));
  }

  return (
    <>
      <form onSubmit={submit} id="form">
        <input type="hidden" />
        <input
          type="checkbox"
          class="hidden"
          style="display:none"
          name="botcheck"
        />
        <div class="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            class="w-full px-4 py-3 border-2 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
            name="name"
          />
        </div>
        <div class="mb-5">
          <label for="email_address" class="sr-only">
            Email Address
          </label>
          <input
            id="email_address"
            type="email"
            placeholder="Email Address"
            name="email"
            required
            class="w-full px-4 py-3 border-2 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
          />
        </div>
        <div class="mb-3">
          <textarea
            name="message"
            required
            placeholder="Your Message"
            class="w-full px-4 py-3 border-2 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"></textarea>
        </div>
        <button class={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"} type="submit">
          Send Message
        </button>
        <br />
      </form>
      <Show when={!response.loading} fallback={<div>Loading...</div>}>
        <p>{response().message}</p>
      </Show>
      <Show when={response.error}>
        <p>There was an error!</p>
      </Show>
    </>
  );
};

export { ContactForm };
