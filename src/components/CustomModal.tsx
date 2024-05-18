"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface ICustomModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  children: React.ReactNode;
}

export function CustomModal({
  openModal,
  setOpenModal,
  children,
}: ICustomModalProps) {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        {children}
      </Modal>
    </>
  );
}
