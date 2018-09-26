FROM alpine:3.7

RUN apk add --no-cache git gcc musl-dev openssl-dev libffi-dev bash python python2-dev py-pip

COPY /requirements.txt /
RUN pip install --upgrade pip && pip install -r requirements.txt

RUN git config --global user.name "travis (Lukas Woodtli)" &&  git config --global user.email lukas_woodtli@travis.example.com


ENTRYPOINT ["python"]

