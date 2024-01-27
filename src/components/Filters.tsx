import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon, FilterIcon } from "./icons";

const Filters = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button
        title="Filters"
        className="z-10 text-[#565c7a] rounded-full hover:bg-[#1d1728] outline outline-transparent outline-8 hover:outline-[#1d1728] transition-colors"
      >
        <FilterIcon />
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 opacity-100 bg-slate-400/50 z-10 " />
      <Dialog.Content className="data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide flex flex-col gap-4 p-4 bg-slate-950 rounded-md shadow-md top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2 z-20 ">
        <Dialog.Title className="flex text-lg gap-2 font-bold">
          <FilterIcon /> Filters
        </Dialog.Title>

        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="absolute top-3 right-3" aria-label="Close">
            <CloseIcon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Filters;
